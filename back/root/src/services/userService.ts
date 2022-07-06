import { MongoUserModel } from "../db";

import bcrypt from "bcrypt";
import issueJwtToken from "../utils/issueJwtToken";
import hashPassword from "../utils/hashPassword";
import { tokenReissue } from "../utils/tokenReissue";

export class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  public async studyList(userId) {
    const studyList = await this.userModel.studyList(userId);
    let point: number = 0;
    studyList.study.forEach(item => {
      point += item.length > 1 ? 20 : 10;
    });
    return { studyList, point };
  }

  public async study(userId, word) {
    const study = await this.userModel.study(userId, word);
    return study;
  }
  // token 다시 받기
  public async getToken(token: string) {
    const accessToken = tokenReissue(token);
    return accessToken;
  }

  public async login(email: string, password: string) {
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

  public async updateUser(userId: string, email?: string, username?: string) {
    let user = await this.userModel.findById(userId);
    const filter = { _id: userId };
    const updateUserData = { ...user, email, username };
    const updatedUser = await this.userModel.updateUser(filter, updateUserData);
    return updatedUser;
  }

  public async changePassword(userId: string, password: string) {
    let user = await this.userModel.findById(userId);
    const hashedPassword = await hashPassword(password);
    const updateUserData = { ...user, password: hashedPassword };
    const updatedUser = await this.userModel.updateUser(userId, updateUserData);
    return updatedUser;
  }

  public async addScore(userId: string, score: number, time: number) {
    const user = await this.userModel.pushScore(userId, score, time);
    return user;
  }

  public async deleteUser(userId: string) {
    const deletedUser = await this.userModel.deleteUser(userId);
    return { deletedUser, status: "succ" };
  }
}
