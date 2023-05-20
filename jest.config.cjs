/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/types.ts",
    "!src/server/app.ts",
    "!src/loadEnvironment.ts",
    "!src/server/CustomError.ts",
    "!src/database/connectToDatabase.ts",
  ],
};
