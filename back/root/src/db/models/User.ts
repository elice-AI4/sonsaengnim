import User from "../schemas/user";
import { IUserModel } from "../../models";
export class MongoUserModel implements IUserModel {
  async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async updateUser(userId, updateUserData) {
    const user = await User.findByIdAndUpdate(userId, { $set: updateUserData }, { new: true });
    return user;
  }

  async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email }).lean();
    return user;
  }

  async findById(userId: string) {
    const user = await User.findById(userId).lean();
    return user;
  }
}
