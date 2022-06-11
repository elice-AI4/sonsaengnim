import { User } from "../schemas/user";

class UserModel {
  // 가입된 유저 찾기
  // 유저 삭제하기
  static delete = async userId => {
    const deletedUser = await User.findByIdAndDelete({ _id: userId });
    return deletedUser;
  };

  // 유저 수정하기
  static modifyUser = async (filter, userUpdateData) => {
    const modifiedUser = await User.findOneAndUpdate(filter, userUpdateData, { new: true });
    return modifiedUser;
  };

  // 유저 아이디로 유저 찾기
  static findById = async ({ id }) => {
    const user = await User.findOne({ id }).lean();
    return user;
  };
  // 가입된 이메일 유저 찾기
  static findByEmail = async ({ email }) => {
    const user = await User.findOne({ email }).lean();
    return user;
  };

  // 유저 생성
  static create = async ({ email, password, name }) => {
    const newUser = await User.create({ email, password, name });
    return newUser;
  };
}

export { UserModel };
