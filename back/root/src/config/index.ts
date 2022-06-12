import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env 파일이 없습니다!!");
}

export default {
  // 백엔드 포트번호
  PORT: process.env.SERVER_PORT || 5000,

  // 데이터베이스 URI
  MONGO_URL: process.env.MONGO_URL || "MONGO_URL does not exist in .env file.",
};
