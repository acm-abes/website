import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createSecretKey } from "node:crypto";
import { gameTokenSchema } from "@/schemas/game-token";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { GameRoom } from "@/database/models";
import jwt from "jsonwebtoken";

/**
 * Get all details of a room
 *
 * Requires game_token
 * game_token will be used to get the room details
 * return room details
 */
export async function POST(req: NextRequest) {
  const gameToken = cookies().get("game_token");

  if (!gameToken) {
    return NextResponse.json(
      {
        json: { message: "Unauthorized" },
      },
      { status: 401 },
    );
  }

  const key = process.env.TOKEN_SECRET!;

  const data = jwt.verify(gameToken.value, key);

  const { currentRoom } = gameTokenSchema.parse(data);

  console.log(currentRoom);

  const room = await GameRoom.findOne<GameRoomDocument>({
    index: currentRoom,
  });

  if (!room) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    room,
  });
}

/**
 * Submit your gameplay and all stats
 */
// export async function POST(req: NextRequest) {}
