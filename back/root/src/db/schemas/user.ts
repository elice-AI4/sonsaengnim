import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  username: string, 
  email: string,
  password: string,
  errorMessage?,
  createdAt?: Date,
  updatedAt?: Date
}

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
  },
);

const User = model<IUser>("User", userSchema);

export { User };
