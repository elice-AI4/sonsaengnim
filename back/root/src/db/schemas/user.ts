import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface UserType {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
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

const User = model<UserType>("User", userSchema);

export { User };
