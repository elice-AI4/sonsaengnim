/* eslint-disable no-unused-vars */
import { IUser } from "./IUser";

export interface IUserModel {
  createUser: (username: string, email: string, password: string) => Promise<Partial<IUser>>;
  updateUser: (username: string, email: string, password: string) => Promise<Partial<IUser>>;
  deleteUser: (userId) => Promise<Partial<IUser>>;
  findByEmail: (email: string) => Promise<Partial<IUser>>;
}
