import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface UserType {
  name: string;
  id: string;
  password: string;
  errorMessage?;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    id: {
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

const User = model<UserType>("User", userSchema);

export { User };
