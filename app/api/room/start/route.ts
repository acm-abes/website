import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { GameRoom, Player } from "@/database/models";
import { GameRoomDocument } from "@/schemas/mongoose/game-room";
import { PlayerDocument } from "@/schemas/mongoose/player";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * Start a new game
 * player is registered to the database and a new game is started
 */
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        json: { message: "Unauthorized" },
      },
      {
        status: 401,
      },
    );
  }

  const { user } = session;
  const { name, email } = user!;

  // const { gameId } = (await req.json()) as { gameId: string };

  // Check if player is already playing
  const player = await Player.findOne<PlayerDocument>({ email });
  const game = await GameRoom.findOne<GameRoomDocument>({ index: 0 });

  console.log(player, game);

  if (!game) {
    return NextResponse.json(
      {
        json: { message: "Game not found" },
      },
      { status: 404 },
    );
  }

  const token = cookies().get("game_token");

  if (player) {
    // Check if game has still time left.
    if (new Date(game.endTime) < new Date()) {
      return NextResponse.json({
        status: 400,
        json: { message: "Game has already ended" },
      });
    }

    if (token?.value)
      return NextResponse.json({
        status: 499,
        json: { message: "Player already playing" },
      });
  }

  // Create a new player
  const currentRoom = 0;
  const score = 0;
  const updatedAt = new Date().toISOString();
  const data = {
    name,
    email,
    gameId: "dawn",
    currentRoom,
    score,
    updatedAt,
    hintsUsed: [],
  };

  const newPlayer = player || (await new Player(data).save());
  console.log("Trying to create key");
  // const key = createSecretKey(Buffer.from(process.env.TOKEN_SECRET!));
  const key = process.env.TOKEN_SECRET!;
  const gameToken = jwt.sign(JSON.stringify(data), key);

  cookies().set("game_token", gameToken);

  return NextResponse.json(
    {
      status: 201,
      json: { message: "Player registered successfully" },
    },
    { status: 201 },
  );
}
