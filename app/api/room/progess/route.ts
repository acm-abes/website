import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Player } from "@/database/models";
import { type Player as PlayerType } from "@/schemas/mongoose/player";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return {
      status: 401,
      json: { message: "Unauthorized" },
    };
  }

  const { user } = session;

  const player = await Player.findOne<PlayerType>({ email: user!.email });

  if (!player) {
    return {
      status: 404,
      json: { message: "Player not found" },
    };
  }

  return NextResponse.json({
    progress: player.currentRoom,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return {
      status: 401,
      json: { message: "Unauthorized" },
    };
  }

  const { user } = session;

  const body = (await req.json()) as { name: string; currentRoom: string };

  const data = {
    email: user?.email,
    updatedAt: new Date().toISOString(),
    ...body,
  };

  // const player = await Player.findOne<PlayerType>({ email: user!.email });
  const player = await new Player(data).save();
}

export async function UPDATE(req: NextRequest) {
  const session = await auth();

  const { newRoom } = (await req.json()) as { newRoom: string };

  if (!session) {
    return {
      status: 401,
      json: { message: "Unauthorized" },
    };
  }

  const { user } = session;

  try {
    const player = await Player.updateOne<PlayerType>(
      { email: user!.email },
      {
        currentRoom: newRoom,
      },
    );
  } catch (e) {
    return NextResponse.json({
      message: "Error updating room",
    });
  }

  return NextResponse.json({
    message: "Room updated",
    progress: newRoom,
  });
}
