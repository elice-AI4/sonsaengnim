import User from "../../models/schemas/user";
import IUserModel from "../../models/interfaces/IUserModel";

export class MongoUserModel implements IUserModel {
  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email }).lean();
    return user;
  }
}
