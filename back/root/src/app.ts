import express from "express";
import routes from "./routes";

import morgan from "morgan";
import cors from "cors";
import path from "path";

// 공통 사항
import swaggerUi from "swagger-ui-express";

// yaml을 연동하기 위함
import YAML from "yamljs";

import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// yaml 파일 연동
const swaggerYaml = YAML.load(path.join(__dirname, "../../root/build/swagger.yaml"));

app.use(morgan("dev"));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes());

// yaml로 된 swagger 연동
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerYaml));

app.use(errorMiddleware);

export { app };
