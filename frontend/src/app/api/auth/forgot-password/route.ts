import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import argon2 from "argon2";
import { sendEmail } from "@/lib/mailer";
import { MyEnvs } from "@/lib/envs";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Email no registrado" },
        { status: 404 }
      );
    }

    // Generar y almacenar el token de restablecimiento
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await argon2.hash(rawToken);
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

    await prisma.verificationToken.upsert({
      where: { identifier_token: { identifier: email, token: hashedToken } },
      update: { token: hashedToken, expires },
      create: { identifier: email, token: hashedToken, expires },
    });

    const resetUrl = `${MyEnvs.NEXTJS}/auth/reset-password/${rawToken}`;

    await sendEmail({
      to: email,
      subject: "Restablece tu contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetUrl}">${resetUrl}</a>`,
    });

    return NextResponse.json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al enviar el correo de restablecimiento" },
      { status: 500 }
    );
  }
}
