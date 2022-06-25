import jwt from "jsonwebtoken";
import config from "../config";

import issueJwtToken from "./issueJwtToken";

export const tokenReissue = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, config.JWT_KEY);
    // importconst obj: any = decoded;
    const tokenReissue = issueJwtToken({ ObjectId: decoded.ObjectId });
    return tokenReissue;
  } catch (error) {
    throw new Error(error);
  }
};
