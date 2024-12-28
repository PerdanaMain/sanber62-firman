import mongoose from "mongoose";
import { Category } from "../utils/interfaces";

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<Category>("categories", CategoriesSchema);
export default CategoryModel;
