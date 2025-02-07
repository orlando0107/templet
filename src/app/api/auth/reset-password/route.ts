import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || newPassword.length < 6) {
      return NextResponse.json(
        { message: "Token inválido o contraseña demasiado corta" },
        { status: 400 }
      );
    }

    const verification = await prisma.verificationToken.findFirst({
      where: { identifier: token },
    });

    if (!verification || verification.expires < new Date()) {
      return NextResponse.json(
        { message: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    // Verificar el token
    const isValid = await argon2.verify(verification.token, token);
    if (!isValid) {
      return NextResponse.json({ message: "Token inválido" }, { status: 400 });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await argon2.hash(newPassword);

    // Actualizar la contraseña
    await prisma.user.update({
      where: { email: verification.identifier },
      data: { password: hashedPassword },
    });

    // Eliminar el token
    await prisma.verificationToken.delete({ where: { id: verification.id } });

    return NextResponse.json({
      message: "Contraseña restablecida correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al restablecer contraseña" },
      { status: 500 }
    );
  }
}
