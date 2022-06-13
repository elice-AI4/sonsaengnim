import { MongoUserModel } from "../db/index";

import hashPassword from "../utils/hashPassword";

export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  public async createUser(email: string, password: string, name: string) {
    const hashedPassword = await hashPassword(password);
    const userData = { email, password: hashedPassword, name };

    const user = await this.userModel.createUser(userData);
    return user;
  }
}
