import { model, Schema } from "mongoose";
import { IQuiz } from "../../models";

const quizSchema = new Schema(
  {
    word: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    wordImageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Quiz = model<IQuiz>("Quiz", quizSchema);

export { Quiz };
