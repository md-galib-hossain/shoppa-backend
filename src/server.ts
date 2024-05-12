import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose, { Schema, model } from "mongoose";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log("connected db");
    server = app.listen(config.port, () => {
      console.log(`App listening at http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log({ err });
  }
}
main();
