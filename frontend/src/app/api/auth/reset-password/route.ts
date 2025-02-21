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


    const verificationTokens = await prisma.temporaryToken.findFirst({
      where: { type: "reset_password", userId: user.id, expires: { gte: new Date() } },
    })

    if(!verificationTokens || !(await argon2.verify(verificationTokens.token, token))) {
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