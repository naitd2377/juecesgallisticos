import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { del } from "@vercel/blob";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const foto = await prisma.foto.findUnique({ where: { id } });
    if (!foto) {
      return NextResponse.json({ error: "Foto no encontrada" }, { status: 404 });
    }

    try {
      const url = new URL(foto.url);
      await del(url.pathname);
    } catch (e) {
      console.error("Error al eliminar blob:", e);
    }

    await prisma.foto.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar foto:", error);
    return NextResponse.json(
      { error: "Error al eliminar foto" },
      { status: 500 }
    );
  }
}