import { IScore } from "./IScore";

export interface IScoreModel {
  createScore: (scoreData: IScore) => Promise<Partial<IScore>>;
  getTopten: () => Promise<Array<IScore>>;
}
