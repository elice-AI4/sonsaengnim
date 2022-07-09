import { model, Schema } from "mongoose";
import { IHand } from "../../models";

const handSchema = new Schema(
  {
    english: {
      // word
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    handVideo: {
      // handVideoURL
      type: String,
      required: true,
    },
    mouthImage: {
      type: String,
      required: true,
    },
    video: {
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
