import { IHand } from "./IHand";

export interface IHandModel {
  create(newHandData: IHand): Promise<Object>;
  findAll(): Promise<Object>;
  findByAlph(alphabet: String): Promise<Object>;
  update(id: any, toUpdate: Object): Promise<Object>;
  delete(_id: any): Promise<Object>;
}
