import { UserModel } from "../db/index";

import { hashPassword } from "../utils/hashPassword";
import { makeToken } from "../utils/makeToken";
class UserService {
  // 유저 삭제
  static delete = async userId => {
    const deletedUser = await UserModel.delete(userId);
    return deletedUser;
  };

  // 유저 정보 수정
  static modifyUser = async ({ email, password, name, userId }) => {
    let user = await UserModel.findById({ id: userId });
    delete user._id;
    if (password) {
      const hashedPassword = hashPassword(password);
      const filter = { _id: userId };
      const userUpdateData = { ...user, email, password: hashedPassword, name };
      const modifiedUser = await UserModel.modifyUser(filter, userUpdateData);
      return modifiedUser;
    } else {
      const filter = { _id: userId };
      const userUpdateData = { ...user, email, password, name };
      const modifiedUser = await UserModel.modifyUser(filter, userUpdateData);
      return modifiedUser;
    }
  };

  // 유저 로그인
  static login = async ({ email, password }) => {
    // 해당 id 가입 내역 확인
    const user = await UserModel.findByEmail({ email });
    if (!user) {
      const errorMessage = "해당 이메일로 가입한 유저가 없습니다.";
      return { errorMessage };
    }

    const hashedPassword = hashPassword(password);
    if (user.password === hashedPassword) {
      const token = makeToken({ ObjectId: user._id });
      return {
        user,
        token,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다.";
      return { errorMessage };
    }
  };

  // 유저 추가
  static createUser = async ({ email, password, name }) => {
    const hashedPassword = hashPassword(password);
    const newUser = await UserModel.create({ email, password: hashedPassword, name });
    return newUser;
  };
}

export { UserService };
