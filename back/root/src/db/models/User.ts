import { User } from "../schemas/user";

class UserModel {
  // 가입된 유저 찾기
  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  };

  // 유저 생성
  static create = async ({ email, password, name }) => {
    const newUser = await User.create({ email, password, name });
    return newUser;
  };
}

export { UserModel };
