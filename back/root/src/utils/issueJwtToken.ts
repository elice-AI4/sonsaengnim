import jwt from "jsonwebtoken";

import config from "../config";

const issueJwtToken = obj => {
  const token = jwt.sign(obj, config.JWT_KEY, { expiresIn: "1h" });
  return token;
};

export default issueJwtToken;
