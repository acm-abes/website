import { NextRequest, NextResponse } from "next/server";
import { QuizSubmission } from "@/database/models";
import { ObjectId } from "bson";

export async function GET(req: NextRequest) {
  const quiz_id = req.nextUrl.searchParams.get("id");

  if (!quiz_id) {
    return NextResponse.json({
      status: 400,
      json: { error: "Invalid quiz ID" },
    });
  }

  const lb = await QuizSubmission.aggregate([
    // Match the specific quiz_id and filter for @gmail.com emails
    {
      $match: {
        quiz_id: new ObjectId(quiz_id),
        attempter_email: { $regex: /@gmail\.com$/ },
      },
    },

    // Lookup to join with the quizsolutions collection
    {
      $lookup: {
        from: "quizsolutions",
        localField: "quiz_id",
        foreignField: "quiz_id",
        as: "solution",
      },
    },

    // Unwind the solution array (since $lookup returns an array)
    { $unwind: "$solution" },

    // Calculate correct answers
    {
      $project: {
        attempter_email: 1,
        attempter_name: 1,
        quiz_id: 1,
        selections: 1,
        submittedAt: 1,
        correctAnswersCount: {
          $reduce: {
            input: { $objectToArray: "$solution.answers" },
            initialValue: 0,
            in: {
              $add: [
                "$$value",
                {
                  $cond: {
                    if: {
                      $eq: [
                        "$$this.v",
                        {
                          $getField: {
                            field: "$$this.k",
                            input: "$selections",
                          },
                        },
                      ],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              ],
            },
          },
        },
      },
    },

    // Add the score field
    {
      $addFields: {
        score: "$correctAnswersCount",
      },
    },

    // Add a derived field to sort by both score and submission time
    {
      $addFields: {
        sortField: {
          $arrayElemAt: [
            [
              { $multiply: ["$score", 1000000] }, // Scale score for primary sorting
              { $toLong: { $toDate: "$submittedAt" } }, // Add submission time for tie-breakers
            ],
            0,
          ],
        },
      },
    },

    // Sort by the derived field
    { $sort: { sortField: -1 } },

    // Assign ranks based on the sorting
    {
      $setWindowFields: {
        partitionBy: null,
        sortBy: { sortField: -1 },
        output: {
          rank: { $rank: {} },
        },
      },
    },

    // Clean up the output
    {
      $project: {
        attempter_email: 1,
        attempter_name: 1,
        quiz_id: 1,
        score: 1,
        rank: 1,
      },
    },
  ]);

  return NextResponse.json({ results: lb }, { status: 200 });
}
