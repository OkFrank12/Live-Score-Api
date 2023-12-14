import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import fs from "fs";
import lodash from "lodash";
export const appConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "API is ready",
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "error from api",
        data: error.message,
      });
    }
  });

  app.get("/read", (req: Request, res: Response) => {
    try {
      const locate = path.join(__dirname, "data", "./db.json");
      fs.readFile(locate, (err, resp) => {
        if (err) {
          return err;
        } else {
          const file = JSON.parse(Buffer.from(resp).toString());

          return res.status(200).json({
            message: "File is read",
            data: file,
          });
        }
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "error from reading data",
        data: error.message,
      });
    }
  });

  app.post("/data", (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const locate = path.join(__dirname, "data", "./db.json");
      fs.readFile(locate, (err, resp) => {
        if (err) {
          return err;
        } else {
          const file = JSON.parse(Buffer.from(resp).toString());

          if (lodash.some(file, data)) {
            return res.status(200).json({
              message: "Can't push...Already existing",
              data: file,
            });
          } else {
            file.push(data);

            fs.writeFile(locate, JSON.stringify(file).toString(), () => {
              console.log("Completed Push...!");
            });

            return res.status(201).json({
              message: "Updated data",
              data: file,
            });
          }
        }
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "error writing file",
        data: error.message,
      });
    }
  });
};
