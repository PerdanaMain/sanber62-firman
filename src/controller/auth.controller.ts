import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { IRequestRegister } from "../utils/interfaces";
import Validator from "../utils/validator";

class AuthController {
  async register(req: IRequestRegister, res: Response) {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/RegisterRequest"
      }
     }
     */
    try {
      const { username, email, password, confirmPassword, roles } = req.body;

      await Validator.registerSchema().validate({
        username,
        email,
        password,
        confirmPassword,
      });

      const user = await AuthService.register({
        username,
        email,
        password,
        roles,
      });

      res.status(201).json({
        status: true,
        data: user,
        message: "Success register",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        status: false,
        data: err.message,
        message: "Failed register",
      });
    }
  }
  async login(req: Request, res: Response) {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/LoginRequest"
      }
     }
     */
    try {
      const { email, password } = req.body;

      await Validator.loginSchema().validate({
        email,
        password,
      });

      const token = await AuthService.login({
        email,
        password,
      });

      res.status(200).json({
        status: true,
        data: token,
        message: "Success login",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        status: false,
        data: err.message,
        message: "Failed login",
      });
    }
  }
  async me(req: Request, res: Response) {}
  async logout(req: Request, res: Response) {}
}

export default new AuthController();
