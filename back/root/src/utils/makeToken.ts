import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const makeToken = obj => {
  const token = jwt.sign(obj, JWT_KEY, { expiresIn: "24h" });
  return token;
};

export { makeToken };
