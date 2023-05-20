import "./loadEnvironment.js";
import mongoose from "mongoose";
import createDebug from "debug";
import app from "./server/index.js";

const debug = createDebug("socialNetwork-api:root");

const port = process.env.PORT ?? 4000;

const mongoDbConnection = process.env.MONGODB_CONECTION;

if (!mongoDbConnection) {
  debug("missing environment variables");
  process.exit(1);
}

try {
  await mongoose.connect(mongoDbConnection);
  debug("Connected to Database");
} catch (error: unknown) {
  debug(`Error connecting DataBase: ${(error as Error).message}`);
}

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
