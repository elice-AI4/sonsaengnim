import { ICard } from "./ICard";

export interface ICardModel {
  getCardImage: () => Promise<Array<ICard>>;
}
