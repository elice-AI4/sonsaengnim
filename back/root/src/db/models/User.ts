import User from "../schemas/user";
import { IUserModel } from "../../models";
export class MongoUserModel implements IUserModel {
  public async studyList(userId: string) {
    const studyList = await User.findById(userId, { _id: 0, study: 1 });
    return studyList;
  }

  public async study(userId: string, word: string) {
    const user = await User.findById(userId);
    if (user.study.indexOf(word) !== -1) {
      throw new Error("이미 학습한 데이터 입니다.");
    } else {
      user.study.push(word);
      user.save();
      return user;
    }
  }

  public async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  public async updateUser(userId, updateUserData) {
    const user = await User.findByIdAndUpdate(userId, { $set: updateUserData }, { new: true });
    return user;
  }

  public async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }

  public async findByEmail(email: string) {
    const user = await User.findOne({ email }).lean();
    return user;
  }

  public async findById(userId: string) {
    const user = await User.findById(userId).lean();
    return user;
  }

  public async pushScore(userId: string, newScore: number, newTime: number) {
    const user = await User.findById(userId).lean();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          scores: {
            username: user.username,
            score: newScore,
            time: newTime,
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    );
    return updatedUser;
  }
}
