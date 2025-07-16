import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/connection";
import { mapServerErrorToUserMessage } from "@/utils/serverErrorMessages";
import { auth } from "@/auth";
import { biographySchema } from "@/schema/myZods";

// GET - Obtener biografía pública por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const biography = await prisma.biography.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!biography) {
      return NextResponse.json(
        { message: "Biografía no encontrada" },
        { status: 404 }
      );
    }

    // Solo permitir acceso si la biografía es pública
    if (!biography.isPublic) {
      return NextResponse.json(
        { message: "Esta biografía no es pública" },
        { status: 403 }
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

// PUT - Actualizar biografía por ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }
    const { id } = params;
    const body = await req.json();
    const validatedData = biographySchema.parse(body);

    // Buscar la biografía y verificar que el usuario sea el dueño
    const biography = await prisma.biography.findUnique({ where: { id } });
    if (!biography) {
      return NextResponse.json(
        { message: "Biografía no encontrada" },
        { status: 404 }
      );
    }
    if (biography.userId !== session.user.id) {
      return NextResponse.json(
        { message: "No tienes permiso para actualizar esta biografía" },
        { status: 403 }
      );
    }
    const updatedBiography = await prisma.biography.update({
      where: { id },
      data: {
        content: validatedData.content,
        title: validatedData.title,
        isPublic: validatedData.isPublic ?? biography.isPublic,
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

// DELETE - Eliminar biografía por ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }
    const { id } = params;
    const biography = await prisma.biography.findUnique({ where: { id } });
    if (!biography) {
      return NextResponse.json(
        { message: "Biografía no encontrada" },
        { status: 404 }
      );
    }
    if (biography.userId !== session.user.id) {
      return NextResponse.json(
        { message: "No tienes permiso para eliminar esta biografía" },
        { status: 403 }
      );
    }
    await prisma.biography.delete({ where: { id } });
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