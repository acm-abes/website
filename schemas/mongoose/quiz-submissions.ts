import mongoose, { Schema } from "mongoose";

export const quizSubmissionSchema = new Schema({
  attempter_email: String,
  attempter_name: String,
  quiz_id: mongoose.Schema.Types.ObjectId,
  selections: {
    type: Map<Number, String>,
  },
});
