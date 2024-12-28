import UserModel from "../models/users.model";
import { encrypt } from "../utils/encryption";
import { IRegisterPayload, ILoginPayload, User } from "../utils/interfaces";
import JWT from "../utils/jwt";

class AuthService {
  async register(payload: IRegisterPayload): Promise<User> {
    const { username, email, password, roles } = payload;

    return await UserModel.create({
      username,
      email,
      password,
      roles,
    });
  }

  async login(payload: ILoginPayload): Promise<String> {
    const { email, password } = payload;
    const userByEmail = await UserModel.findOne({
      email,
    });

    if (!userByEmail) return Promise.reject(new Error("email: user not found"));

    const validatePassword: boolean =
      encrypt(password) === userByEmail.password;

    if (!validatePassword)
      return Promise.reject(new Error("password: user not found"));

    const token = JWT.generateToken({
      id: userByEmail._id,
      roles: userByEmail.roles,
    });
    return token;
  }
}

export default new AuthService();
