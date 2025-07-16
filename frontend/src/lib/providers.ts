import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { sendVerificationRequest } from "@/lib/sendVerificationRequest";
import type { User } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/db/connection";
import * as argon2 from "argon2";
import { MyEnvs } from "./envs";


export const authProviders = [
  Google,
  Nodemailer({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    maxAge: 5 * 60,
    sendVerificationRequest: sendVerificationRequest,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials): Promise<User | null> {
      if (!credentials?.email || !credentials?.password) return null;

      // --- Lógica de seguridad: bloqueo progresivo ---
      const MAX_ATTEMPTS = 5;
      const BLOCK_WINDOW_MINUTES = 15;
      const EXTENDED_BLOCK_WINDOW_MINUTES = 60; // 1 hora
      const EXTENDED_BLOCK_DURATION_HOURS = 24;
      const now = new Date();
      const windowStart = new Date(now.getTime() - BLOCK_WINDOW_MINUTES * 60 * 1000);
      const extendedWindowStart = new Date(now.getTime() - EXTENDED_BLOCK_WINDOW_MINUTES * 60 * 1000);
      const user = await prisma.user.findFirst({ where: { email: credentials.email } });

      // Si el usuario existe, revisa intentos fallidos recientes
      if (user) {
        // Buscar intentos fallidos en la última hora
        const failedAttemptsLastHour = await prisma.failedAttempt.findMany({
          where: {
            userId: user.id,
            attemptAt: { gte: extendedWindowStart },
          },
        });
        // Buscar eventos de bloqueo extendido en las últimas 24h
        const lastExtendedBlock = await prisma.securityEvent.findFirst({
          where: {
            userId: user.id,
            eventType: "account_locked_24h",
            createdAt: { gte: new Date(now.getTime() - EXTENDED_BLOCK_DURATION_HOURS * 60 * 60 * 1000) },
          },
          orderBy: { createdAt: "desc" },
        });
        // Si hay un bloqueo extendido activo, no permitir login
        if (lastExtendedBlock) {
          throw new Error("Tu cuenta está bloqueada por 24 horas debido a múltiples intentos fallidos. Por favor, contacta a soporte técnico: soporte@tudominio.com");
        }
        // Si ya falló 10 veces en la última hora, bloquear 24h
        if (failedAttemptsLastHour.length >= MAX_ATTEMPTS * 2) {
          await prisma.securityEvent.create({
            data: {
              userId: user.id,
              eventType: "account_locked_24h",
              description: `Cuenta bloqueada por 24 horas tras ${MAX_ATTEMPTS * 2} intentos fallidos en 1 hora.`,
              ipAddress: undefined,
              userAgent: undefined,
            },
          });
          throw new Error("Tu cuenta ha sido bloqueada por 24 horas debido a múltiples intentos fallidos. Por favor, contacta a soporte técnico: soporte@tudominio.com");
        }
        // Si falló 5 veces en 15 minutos, bloquear 15 minutos
        const failedAttempts = failedAttemptsLastHour.filter(a => a.attemptAt >= windowStart);
        if (failedAttempts.length >= MAX_ATTEMPTS) {
          await prisma.securityEvent.create({
            data: {
              userId: user.id,
              eventType: "account_locked_15min",
              description: `Cuenta bloqueada por ${MAX_ATTEMPTS} intentos fallidos en ${BLOCK_WINDOW_MINUTES} minutos.`,
              ipAddress: undefined,
              userAgent: undefined,
            },
          });
          throw new Error("Cuenta temporalmente bloqueada por múltiples intentos fallidos. Intenta de nuevo en 15 minutos.");
        }
      }

      try {
        if (!user) {
          // No se puede registrar intento fallido porque no hay userId
          return null;
        }

        const isValid = await argon2.verify(
          user.password as string,
          credentials.password as string,
          { secret: Buffer.from(MyEnvs.SECRET_PASSWORD) }
        );
        if (!isValid) {
          // Registrar intento fallido (contraseña incorrecta)
          await prisma.failedAttempt.create({
            data: {
              userId: user.id,
              ipAddress: undefined,
              userAgent: undefined,
              reason: "Contraseña incorrecta",
              status: "WARNING",
            },
          });
          return null;
        }

        // Si el login es exitoso, limpia los intentos fallidos recientes
        await prisma.failedAttempt.deleteMany({
          where: {
            userId: user.id,
            attemptAt: { gte: extendedWindowStart },
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role as string,
          emailVerified: user.emailVerified || undefined,
        };
      } catch (error) {
        console.error("Error en la autenticación:", error);
        return null;
      }
    },
  }),
];
