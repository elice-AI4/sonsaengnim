import mongoose from "mongoose";
import config from "../config";

export * from "./models/User";
export * from "./models/Hand";

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log(`${config.MONGO_URL} 연결 성공`))
  .catch(() => console.log("몽고 디비 연결 실패 ㅠㅠ"));
