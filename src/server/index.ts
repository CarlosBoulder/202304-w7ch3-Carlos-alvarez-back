import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routers/users/userRouter.js";
import { generalError, notFoundError } from "./middlewares/errorMiddleware.js";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS!.split(" ");

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
