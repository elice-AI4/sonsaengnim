import User from "../schemas/user";
import { Donation } from "../schemas/donation";
import { IUserModel } from "../../models";
export class MongoUserModel implements IUserModel {
  public async studyList(userId: string) {
    const studyList = await User.findById(userId, { _id: 0, study: 1 });
    return studyList;
  }
  public async postDonation(userId: string, point: number, name: string) {
    const user = await User.findById(userId, { myDonation: 1, point: 1 });
    user.myDonation += point;
    user.point -= point;
    if (user.point < 0) {
      throw new Error("User point보다 차감 point가 더 많습니다.");
    }
    user.save();
    const donation = await Donation.findOne({ name }, { currentPoint: 1 });
    donation.currentPoint += point;
    donation.save();
    return { user, donation };
  }

  public async study(userId: string, word: string, point: number) {
    const user = await User.findById(userId);
    if (!point) {
      if (user.study.indexOf(word) !== -1) {
        point = 1;
        user.point += point;
        user.save();
        return { user, point };
      } else {
        point = word.length === 1 ? 10 : 20;
        console.log(point);
        user.point += point;
        user.study.push(word);
        user.save();
        return { user, point };
      }
    } else if (!word) {
      user.point += point;
      user.save();
      return { user, point };
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
