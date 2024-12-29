import mongoose from "mongoose";
import ProductModel from "../../models/products.model";
import ProductService from "../products.service";
import { Product } from "../../utils/interfaces";

// Mocking ProductModel
jest.mock("../../models/products.model");
const mockProductModel = ProductModel as unknown as jest.Mocked<
  typeof ProductModel
>;

// cleansing setelah digunakan
afterEach(() => {
  mockProductModel.find.mockClear();
  mockProductModel.create.mockClear();
  mockProductModel.findById.mockClear();
  mockProductModel.findOneAndUpdate.mockClear();
  mockProductModel.findOneAndDelete.mockClear();
});

describe("product-service.test.ts", () => {
  // tulis kode - kode pengujian di sini
  test("findAll", async () => {
    const mockProducts: Product[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Product 1",
        category: {
          _id: new mongoose.Types.ObjectId(),
          name: "Category 1",
        },
        price: 100,
        description: "Product 1 description",
        qty: 10,
      },
    ];

    const mockFind = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue(mockProducts),
    });

    mockProductModel.find.mockImplementation(mockFind);

    const allProducts = await ProductService.findAll({});

    expect(allProducts.length).toBe(1);
  });
});
