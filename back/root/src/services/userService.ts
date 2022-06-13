import { MongoUserModel } from "../db";

import bcrypt from "bcrypt";
import makeToken from "../utils/makeToken";
import hashPassword from "../utils/hashPassword";
export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      const errorMessage = "해당 이메일로 가입한 유저가 없습니다.";
      return { errorMessage };
    }
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (isPasswordCorrect) {
      const token = makeToken({ ObjectId: user._id });
      return { user, token };
    } else {
      const errorMessage = "비밀번호가 일치하지 않습니다.";
      return { errorMessage };
    }
  }

  async updateUser(email: string, password: string, name: string, userId) {
    let user = await this.userModel.findByEmail(email);

    if (password) {
      const filter = { _id: userId };
      const hashedPassword = await hashPassword(password);
      const updateUserData = { ...user, email, password: hashedPassword, name };

      const updatedUser = await this.userModel.updateUser(filter, updateUserData);

      return updatedUser;
    } else {
      const filter = { _id: userId };
      const updateUserData = { ...user, email, password, name };

      const updatedUser = await this.userModel.updateUser(filter, updateUserData);

      return updatedUser;
    }
  }
  async deleteUser(userId) {
    const deletedUser = await this.userModel.deleteUser(userId);
    return { deletedUser, status: "succ" };
  }
}
