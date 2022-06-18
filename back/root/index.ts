import app from "./src/app";
import config from "./src/config";

app.listen(config.PORT, () => {
  console.log(`${config.PORT}번 포트 온`);
});
