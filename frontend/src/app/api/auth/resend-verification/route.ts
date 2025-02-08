import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import { MyEnvs } from "@/lib/envs";
import crypto from "crypto";
import argon2 from "argon2";
import { sendEmail } from "@/lib/mailer";
import { getIp } from "@/lib/getIp";
import { getDeviceInfo } from "@/lib/ua-parser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "El correo es requerido" },
        { status: 400 }
      );
    }

    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "El usuario no existe" },
        { status: 404 }
      );
    }

    // Verificar si el usuario ya activó su cuenta
    if (user.verifiedEmail) {
      return NextResponse.json(
        { message: "La cuenta ya está activada" },
        { status: 400 }
      );
    }

    // Generar un nuevo token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await argon2.hash(rawToken);
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const ip = getIp(req);
    const deviceInfo = getDeviceInfo(req);

    // Guardar el nuevo token en la base de datos
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
    await sendEmail({
      to: user.email,
      subject: "Reenvío de verificación de cuenta",
      html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>`,
    });

    return NextResponse.json({
      message: "Nuevo enlace de verificación enviado a tu correo",
    });
  } catch (error) {
    console.error("Error al reenviar el email:", error);
    return NextResponse.json(
      { message: "Error al reenviar el email de verificación" },
      { status: 500 }
    );
  }
}
