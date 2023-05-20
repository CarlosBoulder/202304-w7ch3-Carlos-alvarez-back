import { type NextFunction, type Response } from "express";
import {
  type UserCredentialsRequest,
  type UserCredentials,
  type UserData,
} from "../../../types.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../../database/models/User.js";
import loginUser from "./usercontrollers.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const userCredentials: UserCredentials = {
    username: "miga",
    password: "loki",
  };

  const req: Partial<UserCredentialsRequest> = {
    body: userCredentials,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const mockedUserCredentials: UserData = {
    username: "miga",
    password: "loki",
    _id: "sañldkjalksdj2j3oj42l3k4n2j3n4",
  };

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockedUserCredentials),
  });

  describe("When it receives a request with valid credentials", () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    jwt.sign = jest.fn().mockReturnValue("token");

    test("Then it should call the status method with status 200 code", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("When it receives a request with wrong credentials", () => {
    test("Then it should call the status method with status 401 code", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      jwt.sign = jest.fn().mockReturnValue("token");

      const expectederror = new CustomError(401, "wrong credentials pass");

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectederror);
    });
  });
});
