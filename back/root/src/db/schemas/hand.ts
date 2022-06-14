import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IHand {
  alphabet: string,
  handImage: string,
  mouthImage: string,
  video: string,
  createdAt?: Date,
  updatedAt?: Date
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

const Hand = model<IHand>("Hand", handSchema);

export { Hand };
