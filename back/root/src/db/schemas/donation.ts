import { model, Schema } from "mongoose";
import { IDonation } from "../../models";
const donationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    currentPoint: {
      type: Number,
      default: 0,
      required: true,
    },
    goalPoint: {
      type: Number,
      required: true,
      default: 2000000,
    },
  },
  {
    timestamps: true,
  },
);

const Donation = model<IDonation>("Donation", donationSchema);
export { Donation };
