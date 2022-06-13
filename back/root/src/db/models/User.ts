import User from "../../models/schemas/user";
import IUserModel from "../../models/interfaces/IUserModel";

export class MongoUserModel implements IUserModel {
  async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async updateUser(filter, updateUserData) {
    const user = await User.findOneAndUpdate(filter, { $set: updateUserData }, { new: true });
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email }).lean();
    return user;
  }
}
