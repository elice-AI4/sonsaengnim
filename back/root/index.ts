import app from "./src/app";
import mongoose from "mongoose";
import config from "./src/config";

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log(`${config.MONGO_URL} 연결 성공`);
    app.listen(config.PORT, () => {
      console.log(`${config.PORT}번 포트 온`);
    });
  })
  .catch(() => console.log("몽고 디비 연결 실패"));
