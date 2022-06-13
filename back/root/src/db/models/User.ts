import User from "../../models/schemas/user";
import IUserModel from "../../models/interfaces/IUserModel";

export class MongoUserModel implements IUserModel {
  async create(email: string, name: string, password: string) {
    const user = await User.create({ email, name, password });
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
}
