import { Router } from "express";
import loginUser from "../../server/controllers/users/usercontrollers.js";

const userRouter = Router();

userRouter.post("/", loginUser);

export default userRouter;
