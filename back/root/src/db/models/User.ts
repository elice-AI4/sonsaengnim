import { IUser } from "../../models/interfaces/IUser";
import { User } from "../../models/schemas/user";

export interface IUserModel {
  create: (email: string, name: string, password: string) => Promise<Partial<IUser>>;
}

export class UserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    const user = await User.create({ email, name, password });
    return user;
  }
}
