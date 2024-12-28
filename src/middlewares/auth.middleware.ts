import { NextFunction, Request, Response } from "express";
import { IRequestWithUser } from "../utils/interfaces";
import JWT from "../utils/jwt";

class AuthMiddleware {
  verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authorization = req.headers?.authorization;

      if (!authorization) {
        res.status(403).json({
          status: false,
          message: "unauthorized",
          data: null,
        });
      }

      const [prefix, token] = authorization
        ? authorization.split(" ")
        : ["", ""];
      if (!(prefix === "Bearer" && token)) {
        res.status(403).json({
          message: "unauthorized",
          data: null,
        });
      }
      const user = JWT.getUserData(token);

      if (!user) {
        res.status(403).json({
          message: "unauthorized",
          data: null,
        });
      }

      (req as IRequestWithUser).user = user;

      next();
    } catch (error: any) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };
}

export default new AuthMiddleware();
