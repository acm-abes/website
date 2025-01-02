import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { GameRoom, Player } from "@/database/models";
import { type PlayerDocument } from "@/schemas/mongoose/player";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createSecretKey } from "crypto";
import { gameTokenSchema } from "@/schemas/game-token";

/**
 * Returns player's current progress inferred from the token
 */
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      json: { message: "Unauthorized" },
    });
  }

  const gameToken = cookies().get("game_token")?.value;

  if (!gameToken) {
    return NextResponse.json({
      status: 401,
      json: { message: "Unauthorized" },
    });
  }

  const stats = gameTokenSchema.parse(
    await jwtVerify(
      gameToken,
      createSecretKey(Buffer.from(process.env.JWT_SECRET!)),
    ),
  );

  return NextResponse.json(stats);
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

export async function PATCH(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      json: { message: "Unauthorized" },
    });
  }

  const { user } = session;

  try {
    const currentPlayer = await Player.findOne<PlayerDocument>({
      email: user!.email,
    });

    if (!currentPlayer) {
      return NextResponse.json({
        status: 404,
        json: { message: "Player not found" },
      });
    }

    const room = await GameRoom.findOne<GameRoomDocument>({
      index: currentPlayer.currentRoom,
    });

    if (!room) {
      return NextResponse.json({
        message: "Room not found",
      });
    }

    // Update player stats
    currentPlayer.score += room.points;
    currentPlayer.currentRoom += 1;
    currentPlayer.updatedAt = new Date();
    const newPlayer = await currentPlayer.save();

    return NextResponse.json({
      message: "Player updated",
      progress: newPlayer,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Error updating room",
    });
  }
}
