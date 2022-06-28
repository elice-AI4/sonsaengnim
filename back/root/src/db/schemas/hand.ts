import { model, Schema } from "mongoose";
import { IHand } from "../../models";

const handSchema = new Schema(
  {
    english: {
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
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Hand = model<IHand>("Hand", handSchema);

export { Hand };
