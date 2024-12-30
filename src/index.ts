import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./docs/swagger_output.json";
import router from "./routes/api";
import database from "./utils/database";
import { PORT, prefix } from "./utils/env";
import { CustomError } from "./utils/interfaces";

async function main() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const conn = await database.connect();
  app.get(prefix + "/", (req: Request, res: Response) => {
    res.status(200).json({
      status: true,
      message: "Welcome to the API",
      data: conn,
    });
  });

  app.use(router);

  const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: CSS_URL,
    })
  );

  app.use(
    (err: CustomError, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack); // Log error ke console
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
  });
}

main();
