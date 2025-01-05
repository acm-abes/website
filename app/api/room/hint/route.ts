import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Hint, Player } from "@/database/models";
import { PlayerDocument } from "@/schemas/mongoose/player";
import { HintDocument } from "@/schemas/mongoose/hint";

/**
 * @param req
 * @constructor
 *
 * Expects a gameId and a user to be signed in
 * will update user's hint array with the hint
 * will return the hint of that question as a link to the QR code
 */
export async function PATCH(req: NextRequest) {
  const session = await auth();
  const { roomId } = await req.json();

  if (!session) {
    return NextResponse.json(
      {
        status: 401,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { user } = session;

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const player = await Player.findOne<PlayerDocument>({
    email: user.email,
  });

  if (!player) {
    return NextResponse.json(
      {
        message: "Player not found",
      },
      {
        status: 404,
      },
    );
  }

  const { img } = (await Hint.findOne({
    roomId,
  })) as HintDocument;

  // Check if player has already used the hint then return URL to the hint QR
  // else add the hint to the player's hint array
  if (player.hintsUsed.includes(roomId)) {
    // return the hint URL
    return NextResponse.json({
      hint: img,
    });
  }

  player.hintsUsed.push(roomId);
  await player.save();

  return NextResponse.json({
    hint: img,
  });
}
