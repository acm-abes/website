import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { GameRoom, Player } from "@/database/models";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { PlayerDocument } from "@/schemas/mongoose/player";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { createSecretKey } from "node:crypto";

/**
 * Start a new game
 * player is registered to the database and a new game is started
 */
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({
      status: 401,
      json: { message: "Unauthorized" },
    });
  }

  const { user } = session;
  const { name, email } = user!;

  const { gameId } = (await req.json()) as { gameId: string };

  // Check if player is already playing
  const player = await Player.findOne<PlayerDocument>({ email, gameId });
  const game = await GameRoom.findById<GameRoomDocument>(gameId);

  if (!game) {
    return NextResponse.json({
      status: 404,
      json: { message: "Game not found" },
    });
  }

  if (player) {
    // Check if game has still time left.
    if (new Date(game.endTime) < new Date()) {
      return NextResponse.json({
        status: 400,
        json: { message: "Game has already ended" },
      });
    }

    return NextResponse.json({
      status: 499,
      json: { message: "Player already playing" },
    });
  }

  // Create a new player
  const currentRoom = 0;
  const score = 0;
  const updatedAt = new Date().toISOString();
  const data = { name, email, gameId, currentRoom, score, updatedAt };
  const newPlayer = await new Player(data).save();

  const key = createSecretKey(Buffer.from(process.env.JWT_SECRET!));
  const gameToken = await new SignJWT(data).sign(key);

  cookies().set("game_token", gameToken);

  return NextResponse.json({
    status: 201,
    json: { message: "Player registered successfully" },
  });
}
