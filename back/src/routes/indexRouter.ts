import { Router } from "express";
import userRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const router: Router = Router();

router.use("/", userRouter);
router.use("/", appointmentsRouter);

export default router;