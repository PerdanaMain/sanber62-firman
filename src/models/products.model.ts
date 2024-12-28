import mongoose from "mongoose";
import { Product } from "../utils/interfaces";

const Schema = mongoose.Schema;

const ProductsSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Minimal qty adalah 1"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<Product>("products", ProductsSchema);
export default ProductModel;
