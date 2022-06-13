import { MongoUserModel } from "../db";

export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);
    return user;
  }
}
