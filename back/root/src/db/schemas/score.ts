import { IScore } from "../../models/interfaces/IScore";
import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
const scoreSchema = new Schema(
  {
    uerId: {
      tyoe: Schema.Types.ObjectId,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      required: true,
    },
    time: {
      // second
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
