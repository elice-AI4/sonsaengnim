import jwt from "jsonwebtoken";
import config from "../config";

import issueJwtToken from "./issueJwtToken";

export const tokenReissue = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, config.JWT_KEY);
    const tokenReissue = issueJwtToken({ ObjectId: decoded.ObjectId });
    return tokenReissue;
  } catch (error) {
    if (error.message === "jwt expired") {
      throw new Error("토큰이 만료되었습니다. " + error.message);
    } else {
      throw new Error("토큰이 변형되었습니다." + error.message);
    }
  }
};
