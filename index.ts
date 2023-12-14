import express, { Application } from "express";
import { appConfig } from "./mainApp";

const port: number = 4500;
const app: Application = express();
appConfig(app);

const server = app.listen(port, () => {
  console.log("Server's kickstart response");
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
