import { model, Schema } from "mongoose";
import { IHand } from "../../models";

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
    timestamps: true,
    versionKey: false,
  },
);

const Hand = model<IHand>("Hand", handSchema);

export { Hand };
