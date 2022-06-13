/* eslint-disable no-unused-vars */
import IUser from "./IUser";

export default interface IUserModel {
  createUser: (email: string, password: string, name: string) => Promise<Partial<IUser>>;
  updateUser: (email: string, password: string, name: string) => Promise<Partial<IUser>>;
  findByEmail: (email: string) => Promise<Partial<IUser>>;
}
