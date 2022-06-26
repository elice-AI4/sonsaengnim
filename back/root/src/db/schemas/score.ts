import { IScore } from "../../models/interfaces/IScore";
import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
const scoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Score = model<IScore>("Score", scoreSchema);

export default Score;
