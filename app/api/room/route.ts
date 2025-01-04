import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createSecretKey } from "node:crypto";
import { gameTokenSchema } from "@/schemas/game-token";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { GameRoom } from "@/database/models";

/**
 * Get all details of a room
 *
 * Requires game_token
 * game_token will be used to get the room details
 * return room details
 */
export async function GET(req: NextRequest) {
  const gameToken = cookies().get("game_token");

  if (!gameToken) {
    return {
      status: 401,
      json: { message: "Unauthorized" },
    };
  }

  const key = createSecretKey(Buffer.from(process.env.JWT_SECRET!));

  const data = await jwtVerify(gameToken.value, key);

  const { currentRoom, gameId } = gameTokenSchema.parse(data.payload);

  const room = await GameRoom.findOne<GameRoomDocument>({
    gameId,
    currentRoom,
  });

  if (!room) {
    return NextResponse.json({
      status: 404,
      message: "Room not found",
    });
  }

  return NextResponse.json({
    room,
  });
}

/**
 * Submit your gameplay and all stats
 */
// export async function POST(req: NextRequest) {}
