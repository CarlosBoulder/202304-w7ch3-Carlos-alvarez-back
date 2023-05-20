import { Router } from "express";
import {
  getUsers,
  loginUser,
} from "../../controllers/users/usercontrollers.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

userRouter.get("/users", getUsers);

export default userRouter;
