import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
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

    // Validar antes de buscar tokens existentes
    if (!user.password) {
      return NextResponse.json(
        { message: "Tu cuenta no tiene contraseña establecida. Si deseas agregar una contraseña, hazlo desde tu perfil." },
        { status: 400 }
      );
    }

    await prisma.temporaryToken.deleteMany({ where: { userId: user.id,
      type:"reset_password",
      expires: {
        lt: new Date(),
      }
    } });

    // Buscar token existente solo si el usuario tiene contraseña
    const existingToken = await prisma.temporaryToken.findFirst({
      where:{
        userId: user.id,
        type: "reset_password",
        expires: {
          gt: new Date(),
        }
      }
    })

    if(existingToken){
      return NextResponse.json(
        {message: "Ya se ha enviado un enlace de restablecimeinto , Revisa tu Correo"},
        {status: 200}
      );
    }
    //
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await argon2.hash(rawToken);
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.temporaryToken.create({
      data: {
        type: "reset_password",
        userId: user.id,
        expires,
        token: hashedToken,
      },
    });

    const resetUrl = `${MyEnvs.NEXTJS}/auth/reset-password/${rawToken}`

    await sendEmail({
      to: email,
      subject: "Restablecimiento de contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                  <a href="${resetUrl}">${resetUrl}</a>`
    });

    return NextResponse.json({ message: "Correo enviado correctamente" });

  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error);
    return NextResponse.json(
      { message: "Error al enviar el correo de restablecimiento" },
      { status: 500 }
    );
  }
}
