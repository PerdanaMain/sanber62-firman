import jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { IUserToken, User } from "./interfaces";

class JWT {
  generateToken(user: IUserToken): string {
    return jwt.sign(user, SECRET, { expiresIn: "1h" });
  }

  getUserData(token: string): User {
    return jwt.verify(token, SECRET) as User;
  }
}

export default new JWT();
