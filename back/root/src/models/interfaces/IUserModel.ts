import IUser from "./IUser";

export default interface IUserModel {
  // eslint-disable-next-line no-unused-vars
  create: (email: string, name: string, password: string) => Promise<Partial<IUser>>;
}
