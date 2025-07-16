import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { MyEnvs } from "@/lib/envs";

export async function POST(req: NextRequest) {
  try {
    const { token, password, email } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { message: "Datos Incompletos" },
        {
          status: 400,
        }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if(!user) {
      return NextResponse.json(
        {
          message:"No se encontro el usuario"
        },
        {
          status: 404
        }
      )
    }

    // --- Protección contra fuerza bruta en recuperación de contraseña ---
    const MAX_ATTEMPTS = 5;
    const BLOCK_WINDOW_MINUTES = 15;
    const EXTENDED_BLOCK_WINDOW_MINUTES = 60; // 1 hora
    const EXTENDED_BLOCK_DURATION_HOURS = 24;
    const now = new Date();
    const windowStart = new Date(now.getTime() - BLOCK_WINDOW_MINUTES * 60 * 1000);
    const extendedWindowStart = new Date(now.getTime() - EXTENDED_BLOCK_WINDOW_MINUTES * 60 * 1000);

    // Buscar intentos fallidos en la última hora
    const failedAttemptsLastHour = await prisma.failedAttempt.findMany({
      where: {
        userId: user.id,
        reason: "Token de recuperación inválido",
        attemptAt: { gte: extendedWindowStart },
      },
    });
    // Buscar eventos de bloqueo extendido en las últimas 24h
    const lastExtendedBlock = await prisma.securityEvent.findFirst({
      where: {
        userId: user.id,
        eventType: "reset_blocked_24h",
        createdAt: { gte: new Date(now.getTime() - EXTENDED_BLOCK_DURATION_HOURS * 60 * 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });
    if (lastExtendedBlock) {
      return NextResponse.json(
        {
          message: "El proceso de recuperación está bloqueado por 24 horas debido a múltiples intentos fallidos. Contacta a soporte técnico: soporte@tudominio.com"
        },
        { status: 429 }
      );
    }
    // Si ya falló 10 veces en la última hora, bloquear 24h
    if (failedAttemptsLastHour.length >= MAX_ATTEMPTS * 2) {
      await prisma.securityEvent.create({
        data: {
          userId: user.id,
          eventType: "reset_blocked_24h",
          description: `Recuperación bloqueada por 24 horas tras ${MAX_ATTEMPTS * 2} intentos fallidos en 1 hora.`,
          ipAddress: undefined,
          userAgent: undefined,
        },
      });
      return NextResponse.json(
        {
          message: "El proceso de recuperación ha sido bloqueado por 24 horas debido a múltiples intentos fallidos. Contacta a soporte técnico: soporte@tudominio.com"
        },
        { status: 429 }
      );
    }
    // Si falló 5 veces en 15 minutos, bloquear 15 minutos
    const failedAttempts = failedAttemptsLastHour.filter(a => a.attemptAt >= windowStart);
    if (failedAttempts.length >= MAX_ATTEMPTS) {
      await prisma.securityEvent.create({
        data: {
          userId: user.id,
          eventType: "reset_blocked_15min",
          description: `Recuperación bloqueada por ${MAX_ATTEMPTS} intentos fallidos en ${BLOCK_WINDOW_MINUTES} minutos.`,
          ipAddress: undefined,
          userAgent: undefined,
        },
      });
      return NextResponse.json(
        {
          message: "Has superado el número máximo de intentos fallidos. Intenta de nuevo en 15 minutos. Si el problema persiste, contacta a soporte técnico."
        },
        { status: 429 }
      );
    }

    // --- Fin protección fuerza bruta ---

    const verificationTokens = await prisma.temporaryToken.findFirst({
      where: { type: "reset_password", userId: user.id, expires: { gte: new Date() } },
    })

    if(!verificationTokens || !(await argon2.verify(verificationTokens.token, token))) {
      // Registrar intento fallido
      await prisma.failedAttempt.create({
        data: {
          userId: user.id,
          ipAddress: undefined,
          userAgent: undefined,
          reason: "Token de recuperación inválido",
          status: "WARNING",
        },
      });
      return NextResponse.json(
        {
          message:"Token invalido o expirado"
        },
        {
          status: 400
        }
      )
    }

    const hashedPassword = await argon2.hash(password,{
      secret: Buffer.from(MyEnvs.SECRET_PASSWORD),
    });

    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });

    await prisma.temporaryToken.delete({
      where: { id: verificationTokens.id },
    });

    // Limpiar intentos fallidos recientes tras éxito
    await prisma.failedAttempt.deleteMany({
      where: {
        userId: user.id,
        reason: "Token de recuperación inválido",
        attemptAt: { gte: extendedWindowStart },
      },
    });

    return NextResponse.json({
      message: "Contraseña restablecida correctamente",
    });
  } catch (error: unknown) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { message: "Error al restablecer contraseña"},
      { status: 500 }
    );
  }
}