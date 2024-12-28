import { Types } from "mongoose";

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
