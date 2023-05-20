import { Router } from "express";
import {
  getUsers,
  loginUser,
} from "../../server/controllers/users/usercontrollers.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

userRouter.get("/users", getUsers);

export default userRouter;
