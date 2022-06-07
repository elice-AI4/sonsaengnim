import { UserModel } from "../db/index";

import { hashPassword } from "../utils/hashPassword";

class UserService {
  static createUser = async ({ email, password, name }) => {
    const hashedPassword = hashPassword(password);
    const newUser = await UserModel.create({ email, password: hashedPassword, name });
    return newUser;
  };
}

export { UserService };
