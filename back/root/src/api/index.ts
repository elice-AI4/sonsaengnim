import { Router } from "express";
// import { indexRouter } from "./indexRouter";
import { registerRouter } from "./routes/registerRouter";
import { indexRouter } from "./routes/indexRouter";
import { userRouter } from "./routes/userRouter";
import { handRouter } from "./routes/handRouter";

const router = Router();

router.use("/", indexRouter);
router.use("/register", registerRouter);
router.use("/user", userRouter);
router.use("/hands", handRouter);

export { router };
