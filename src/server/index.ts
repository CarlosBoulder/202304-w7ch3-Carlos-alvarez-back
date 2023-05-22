import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routers/users/userRouter.js";

const app = express();

app.disable("x-powered-by");

const allowedOrigins = process.env.ALLOWED_ORIGINS!.split(" ");

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(morgan("dev"));

app.use(express.json());

app.use(cors(options));

app.use("/", userRouter);

export default app;
