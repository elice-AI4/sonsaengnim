import { model, Schema } from "mongoose";
import { ICard } from "../../models";

const cardSchema = new Schema({
  word: {
    type: String,
    unique: true,
    require: true,
  },
  english: {
    type: String,
    unique: true,
    require: true,
  },
  cardImageURL: {
    type: String,
  },
});

const Card = model<ICard>("Card", cardSchema);
export { Card };
