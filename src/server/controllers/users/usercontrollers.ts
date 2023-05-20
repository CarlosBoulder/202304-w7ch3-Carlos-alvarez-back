import bcrypt from "bcryptjs";
import { type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type UserCredentialsRequest } from "../../../types.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      const customError = new CustomError(401, "wrong credentials user");

      throw customError;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "wrong credentials pass");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error: unknown) {
    next(error);
  }
};
