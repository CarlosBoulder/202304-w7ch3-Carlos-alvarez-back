import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routers/users/userRouter.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use("/", userRouter);

export default app;
