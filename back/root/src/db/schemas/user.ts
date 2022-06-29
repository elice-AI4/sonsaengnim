import { IUser } from "../../models";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    scores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Score",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model<IUser>("User", userSchema);

export default User;
