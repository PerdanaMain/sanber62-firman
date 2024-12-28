import { Request } from "express";
import { Types } from "mongoose";
import * as Yup from "yup";
import Validator from "./validator";

export interface Product {
  _id?: Types.ObjectId;
  category: Category;
  name: string;
  description: string;
  price: number;
  qty: number;
}

export interface Category {
  _id?: Types.ObjectId;
  name: string;
}

export interface User {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string[];
  profilePicture: string;
}

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: number;
  status: string[];
  orderDetails: OrderDetail[];
  createdBy: Types.ObjectId;
}

export interface OrderDetail {
  _id?: Types.ObjectId;
  product: Product;
  qty: number;
  order: Order;
}

type TLoginBody = Yup.InferType<ReturnType<typeof Validator.loginSchema>>;
type TRegisterBody = Yup.InferType<ReturnType<typeof Validator.registerSchema>>;

export interface IRequestLogin extends Request {
  body: TLoginBody;
}

export interface IRequestRegister extends Request {
  body: TRegisterBody;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  roles: (string | undefined)[] | undefined;
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface OrderItems {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface IRequestWithUser extends Request {
  user?: IUserToken;
}
