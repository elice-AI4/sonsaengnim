import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface HandType {
  alphabet: string;
  handImage: string;
  mouthImage: string;
  video: string;
}

const handSchema = new Schema(
  {
    alphabet: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    handImage: {
      type: String,
      required: true,
    },
    mouthImage: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  {
    timestamps:true
  }
);

const Hand = model<HandType>("Hand", handSchema);

export { Hand };
