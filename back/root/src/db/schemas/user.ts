import { IUser } from "../../models";
import { model, Schema } from "mongoose";
import { IScore } from "../../models/interfaces/IScore";

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
    scores: {
      type: Array[
        { $type:
          type: Schema.Types.ObjectId,
          ref: "Score",
        }
      ], // 수정 필요
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model<IUser>("User", userSchema);

export default User;
