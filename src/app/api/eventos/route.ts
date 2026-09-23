import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const events = await prisma.event.findMany({
      where: { userId: user.userId },
      include: {
        _count: {
          select: { fights: true },
        },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Error al obtener eventos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { name, date, location, description } = await request.json();

    if (!name || !date) {
      return NextResponse.json(
        { error: "Nombre y fecha son requeridos" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        location: location || null,
        description: description || null,
        userId: user.userId,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Error al crear evento" },
      { status: 500 }
    );
  }
}
