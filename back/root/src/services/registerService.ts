import { MongoUserModel } from "../db";

import hashPassword from "../utils/hashPassword";

export class RegisterService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  // validation 추가 trim도
  public async createUser(username: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const userData = { username, email, password: hashedPassword };

    const user = await this.userModel.createUser(userData);
    return user;
  }
}
