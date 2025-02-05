import { prisma } from "@/db/connection";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: parsedData.password, 
      },
    });
    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
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
