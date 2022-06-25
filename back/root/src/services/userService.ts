import { MongoUserModel } from "../db";

import bcrypt from "bcrypt";
import issueJwtToken from "../utils/issueJwtToken";
import hashPassword from "../utils/hashPassword";
import { tokenReissue } from "../utils/tokenReissue";

export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  // token 다시 받기
  async getToken(token: string) {
    const accessToken = tokenReissue(token);
    console.log(accessToken);
    return accessToken;
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findByEmail(email);

      if (!user) {
        throw new Error("해당 이메일로 가입한 유저가 없습니다.");
      }
      const correctPasswordHash = user.password;
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

      if (isPasswordCorrect) {
        const token = issueJwtToken({ ObjectId: user._id });
        return { user, token };
      } else {
        throw new Error("비밀 번호가 일치하지 않습니다.");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(userId: string, email?: string, username?: string) {
    let user = await this.userModel.findById(userId);

    const filter = { _id: userId };
    const updateUserData = { ...user, email, username };

    const updatedUser = await this.userModel.updateUser(filter, updateUserData);

    return updatedUser;
  }

  async changePassword(userId: string, password: string) {
    let user = await this.userModel.findById(userId);
    const hashedPassword = await hashPassword(password);

    const updateUserData = { ...user, password: hashedPassword };

    const updatedUser = await this.userModel.updateUser(userId, updateUserData);

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.userModel.deleteUser(userId);
    return { deletedUser, status: "succ" };
  }
}
