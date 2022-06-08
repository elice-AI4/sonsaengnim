import { User } from "../schemas/user";

class UserModel {
  // 가입된 유저 찾기
  static findById = async ({ id }) => {
    const user = await User.findOne({ id });
    return user;
  };

  // 유저 생성
  static create = async ({ id, password, name }) => {
    const newUser = await User.create({ id, password, name });
    return newUser;
  };
}

export { UserModel };
