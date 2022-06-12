import { UserModel } from "../db/index";

export default class UserService {
  constructor(private UserModel: UserModel) {}

  public async createUser(email: string, password: string, name: string) {
    const user = await this.UserModel.create(email, password, name);
    return user;
  }
}
