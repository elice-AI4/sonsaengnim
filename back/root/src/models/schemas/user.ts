import IUser from "../interfaces/IUser";
import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
  
);

const User = model<IUser>("User", userSchema);

export default User;
