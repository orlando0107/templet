import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/db/connection";
import { biographySchema } from "@/schema/myZods";
import { mapServerErrorToUserMessage } from "@/utils/serverErrorMessages";

// GET - Obtener biografía del usuario actual
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const biography = await prisma.biography.findUnique({
      where: { userId: session.user.id },
    });

    if (!biography) {
      return NextResponse.json(
        { message: "Biografía no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(biography);
  } catch (error) {
    console.error("Error al obtener biografía:", error);
    const userMessage = mapServerErrorToUserMessage(error);
    return NextResponse.json(
      { message: userMessage },
      { status: 500 }
    );
  }
}

// POST - Crear nueva biografía
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = biographySchema.parse(body);

    // Verificar si ya existe una biografía para este usuario
    const existingBiography = await prisma.biography.findUnique({
      where: { userId: session.user.id },
    });

    if (existingBiography) {
      return NextResponse.json(
        { message: "Ya tienes una biografía. Usa PUT para actualizarla." },
        { status: 400 }
      );
    }

    const biography = await prisma.biography.create({
      data: {
        userId: session.user.id,
        content: validatedData.content,
        title: validatedData.title,
        isPublic: validatedData.isPublic ?? false,
      },
    });

    return NextResponse.json(biography, { status: 201 });
  } catch (error) {
    console.error("Error al crear biografía:", error);
    const userMessage = mapServerErrorToUserMessage(error);
    return NextResponse.json(
      { message: userMessage },
      { status: 500 }
    );
  }
}

// PUT - Actualizar biografía existente
export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = biographySchema.parse(body);

    // Buscar la biografía existente
    const existingBiography = await prisma.biography.findUnique({
      where: { userId: session.user.id },
    });

    if (!existingBiography) {
      return NextResponse.json(
        { message: "Biografía no encontrada. Usa POST para crear una nueva." },
        { status: 404 }
      );
    }

    const updatedBiography = await prisma.biography.update({
      where: { userId: session.user.id },
      data: {
        content: validatedData.content,
        title: validatedData.title,
        isPublic: validatedData.isPublic ?? existingBiography.isPublic,
      },
    });

    return NextResponse.json(updatedBiography);
  } catch (error) {
    console.error("Error al actualizar biografía:", error);
    const userMessage = mapServerErrorToUserMessage(error);
    return NextResponse.json(
      { message: userMessage },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar biografía
export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const existingBiography = await prisma.biography.findUnique({
      where: { userId: session.user.id },
    });

    if (!existingBiography) {
      return NextResponse.json(
        { message: "Biografía no encontrada" },
        { status: 404 }
      );
    }

    await prisma.biography.delete({
      where: { userId: session.user.id },
    });

    return NextResponse.json(
      { message: "Biografía eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar biografía:", error);
    const userMessage = mapServerErrorToUserMessage(error);
    return NextResponse.json(
      { message: userMessage },
      { status: 500 }
    );
  }
} 