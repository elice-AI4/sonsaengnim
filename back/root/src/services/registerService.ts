import { MongoUserModel } from "../db";

import hashPassword from "../utils/hashPassword";

export class RegisterService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  // validation 추가 trim도
  public async createUser(username: string, email: string, password: string) {
    try {
      const isUserinDB = await this.userModel.findByEmail(email);
      if (isUserinDB) {
        throw new Error("해당 이메일로 가입한 유저가 이미 있습니다.");
      } else {
        const hashedPassword = await hashPassword(password);
        const userData = { username, email, password: hashedPassword };
        const user = await this.userModel.createUser(userData);
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
