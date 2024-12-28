import { Types } from "mongoose";

export interface Product {
  _id?: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  qty: number;
}

export interface Category {
  _id?: Types.ObjectId;
  name: string;
}
