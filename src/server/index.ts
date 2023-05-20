import express from "express";
import morgan from "morgan";
import userRouter from "../routers/users/userRouter.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/", userRouter);

export default app;
