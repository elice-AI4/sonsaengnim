import { MongoUserModel } from "../db";

import bcrypt from "bcrypt";
import makeToken from "../utils/makeToken";

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
}
