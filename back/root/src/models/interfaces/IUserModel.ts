/* eslint-disable no-unused-vars */
import IUser from "./IUser";

export default interface IUserModel {
  create: (email: string, password: string, name: string) => Promise<Partial<IUser>>;
  findByEmail: (email: string) => Promise<Partial<IUser>>;
}
