import { IScore } from "./IScore";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  point: number;
  myDonation: number;
  study?: Array<string>;
  errorMessage?;
  userId?: string;
  scores?: Array<IScore>;
  againedPoint?: number;
}
