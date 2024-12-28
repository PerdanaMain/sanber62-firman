import express, { Request, Response } from "express";
import database from "./utils/database";
import { PORT, prefix } from "./utils/env";
import bodyParser from "body-parser";
import cors from "cors";

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

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
  });
}

main();
