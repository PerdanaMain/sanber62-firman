import ProductModel from "../models/products.model";
import { Product } from "../utils/interfaces";

class ProductsService {
  async findAll(
    query: any,
    limit: number = 10,
    page: number = 1
  ): Promise<Product[]> {
    return await ProductModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate("category");
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  async create(data: Product): Promise<Product> {
    return await ProductModel.create(data);
  }

  async update(id: string, data: Product): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(
      {
        _id: id,
      },
      data,
      {
        new: true,
      }
    );
  }

  async delete(id: string): Promise<Product | null> {
    return await ProductModel.findByIdAndDelete({
      _id: id,
    });
  }
}

export default new ProductsService();
