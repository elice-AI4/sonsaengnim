import { User } from "../schemas/user";

class UserModel {
  static create = async ({ email, password, name }) => {
    const newUser = await User.create({ email, password, name });
    return newUser;
  };
}

export { UserModel };
