import { IScore } from "../../models/interfaces/IScore";
import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
const scoreSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    scores: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Score = model<IScore>("Score", scoreSchema);

export default Score;
