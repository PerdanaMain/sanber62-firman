import CategoryModel from "../models/categories.model";
import { Category } from "../utils/interfaces";

class CategoriesService {
  async findAll(): Promise<Category[]> {
    return await CategoryModel.find();
  }

  async findById(id: string): Promise<Category | null> {
    return await CategoryModel.findById(id);
  }

  async create(data: Category): Promise<Category> {
    return await CategoryModel.create(data);
  }

  async update(id: string, data: Category): Promise<Category | null> {
    return await CategoryModel.findByIdAndUpdate(
      {
        _id: id,
      },
      data,
      {
        new: true,
      }
    );
  }

  async delete(id: string): Promise<Category | null> {
    return await CategoryModel.findByIdAndDelete({
      _id: id,
    });
  }
}

export default new CategoriesService();
