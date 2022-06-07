import { UserModel } from "../db/index";

class UserService {
  static createUser = async ({ email, password, name }) => {
    const newUser = await UserModel.create({ email, password, name });
    return newUser;
  };
}

export { UserService };
