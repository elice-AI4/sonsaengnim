import { MongoUserModel } from "../db/index";

export default class UserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userModel: MongoUserModel) {}

  public async createUser(email: string, password: string, name: string) {
    const user = await this.userModel.create(email, password, name);
    return user;
  }
}
