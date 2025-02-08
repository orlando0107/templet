import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const rawToken = url.searchParams.get("token");

    if (!rawToken) {
      return NextResponse.json({ message: "Token inválido" }, { status: 400 });
    }

    // Buscar todos los tokens en la base de datos
    const verificationTokens = await prisma.temporaryToken.findMany({
      where: { type: "activation" },
    });

    // Buscar el token correcto comparando con `argon2.verify()`
    let verification = null;
    for (const record of verificationTokens) {
      if (await argon2.verify(record.token, rawToken)) {
        verification = record;
        break;
      }
    }

    if (!verification || verification.expires < new Date()) {
      return NextResponse.json(
        { message: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    // Activar la cuenta del usuario
    await prisma.user.update({
      where: { id: verification.userId },
      data: { verifiedEmail: true },
    });

    // Eliminar el token de la base de datos
    await prisma.temporaryToken.delete({
      where: { id: verification.id }, // Ahora eliminamos por `id`, no por `token`
    });

    return NextResponse.json({ message: "Cuenta verificada correctamente" });
  } catch (error) {
    console.error("Error al verificar cuenta:", error);
    return NextResponse.json(
      { message: "Error al verificar la cuenta" },
      { status: 500 }
    );
  }
}
