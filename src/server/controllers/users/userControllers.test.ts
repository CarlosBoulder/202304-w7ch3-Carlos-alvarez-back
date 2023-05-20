import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import {
  type UserCredentialsRequest,
  type UserCredentials,
  type UserData,
} from "../../../types.js";

import bcrypt from "bcryptjs";
import User from "../../../database/models/User.js";
import { getUsers, loginUser } from "./usercontrollers.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser fuction controller", () => {
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

  describe("When it receives a request with valid credentials", () => {
    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockedUserCredentials),
    });

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
      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      jwt.sign = jest.fn().mockReturnValue("token");

      const expectederror = new CustomError(401, "wrong credentials user");

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectederror);
    });
  });

  describe("When it receives a request with wrong credentials", () => {
    test("Then it should call the status method with status 401 code", async () => {
      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedUserCredentials),
      });

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

describe("Given a getUsers fuction controller", () => {
  const req: Partial<UserCredentialsRequest> = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const usersToReturn: UserData[] = [
    {
      username: "miga",
      password: "loki",
      _id: "sañldkjalksdj2j3oj42l3k4n2j3n4",
    },
  ];

  describe("When it receives a request", () => {
    User.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(usersToReturn),
    });

    test("Then it should response with status 200 code", async () => {
      await getUsers(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should response with a list of users", async () => {
      const expectedResponseBody = { users: usersToReturn };

      await getUsers(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
});
