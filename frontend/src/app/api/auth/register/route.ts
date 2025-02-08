import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import argon2 from "argon2";
import { MyEnvs } from "@/lib/envs";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";
import { getIp } from "@/lib/getIp";
import { getDeviceInfo } from "@/lib/ua-parser";

const RegisterSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z
    .string()
    .email("Correo electrónico no válido")
    .min(1, "El correo es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = RegisterSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "El correo ya está registrado" },
        { status: 400 }
      );
    }
    const hashedPassword = await argon2.hash(parsedData.password, {
      secret: Buffer.from(MyEnvs.SECRET_PASSWORD),
    });
    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: hashedPassword,
        verifiedEmail: false,
        accounts:{
          create:{
            type:"credentials",
            provider:"credentials",
            providerAccountId: parsedData.email,
          }
        }
      },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await argon2.hash(rawToken);

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const ip = getIp(req);
    const deviceInfo = getDeviceInfo(req);

    await prisma.temporaryToken.create({
      data: {
        userId: user.id,
        type: "activation",
        attempts: 0,
        ipAddress: ip,
        userAgent: deviceInfo.device,
        token: hashedToken,
        expires,
      },
    });

    // URL de verificación
    const verifyUrl = `${MyEnvs.NEXTJS}/auth/verify-email/${rawToken}`;

    // Enviar email con el enlace de verificación
    try {
      await sendEmail({
        to: user.email,
        subject: "Verifica tu cuenta",
        html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
              <a href="${verifyUrl}">${verifyUrl}</a>`,
      });
    } catch (emailError) {
      console.error("Error al enviar email:", emailError);
      // Si falla el envío del email, eliminamos al usuario para evitar registros huérfanos
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { message: "Error al enviar el email de verificación" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Verifica Tu email para activar tu Cuenta",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Hubo un error al registrar al usuario" },
      { status: 500 }
    );
  }
}
