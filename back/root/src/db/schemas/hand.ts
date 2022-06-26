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
    handVideo: {
      type: String,
      required: true,
    },
    mouthVideo: {
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
