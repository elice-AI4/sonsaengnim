import jwt from "jsonwebtoken";

import config from "../config";

const makeToken = obj => {
  const token = jwt.sign(obj, config.issueJwtToken, { expiresIn: "24h" });
  return token;
};

export default makeToken;
