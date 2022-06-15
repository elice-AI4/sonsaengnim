import { MongoUserModel } from "../db/index";

import hashPassword from "../utils/hashPassword";

export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  public async createUser(username: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const userData = { username, email, password: hashedPassword };

    const user = await this.userModel.createUser(userData);
    return user;
  }
}
