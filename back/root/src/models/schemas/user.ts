import IUser from "../interfaces/IUser";
import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>("User", userSchema);

export { User };
