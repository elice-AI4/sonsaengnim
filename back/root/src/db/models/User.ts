import { User } from "../../models/schemas/user";
import IUserModel from "../../models/interfaces/IUserModel";

export class UserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    const user = await User.create({ email, name, password });
    return user;
  }
}
