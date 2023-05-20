import { Router } from "express";
import {
  getUsers,
  loginUser,
} from "../../controllers/users/usercontrollers.js";
import { auth } from "../../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

userRouter.get("/users", auth, getUsers);

export default userRouter;
