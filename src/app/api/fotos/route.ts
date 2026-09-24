import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const fotos = await prisma.foto.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(fotos);
  } catch (error) {
    console.error("Error al obtener fotos:", error);
    return NextResponse.json(
      { error: "Error al obtener fotos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const eventName = formData.get("eventName") as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: "Archivo y título son requeridos" },
        { status: 400 }
      );
    }

    const blobToken = process.env.MI_BLOB_TOKEN;

    const blob = await put(`galeria/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: false,
      token: blobToken,
    });

    const foto = await prisma.foto.create({
      data: {
        url: blob.url,
        title,
        eventName: eventName || null,
      },
    });

    return NextResponse.json(foto);
  } catch (error) {
    console.error("Error al subir foto:", error);
    return NextResponse.json(
      { error: "Error al subir foto" },
      { status: 500 }
    );
  }
}