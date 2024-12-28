import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import ProductsService from "../services/products.service";

class ProductsController {
  async index(req: Request, res: Response) {
    try {
      const result = await ProductsService.findAll();
      res.status(200).json({
        status: true,
        message: "Success get all products",
        data: result,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params?.id;
      const result = await ProductsService.findById(id);
      res.status(200).json({
        status: true,
        message: "Success get product",
        data: result,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
  async store(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await ProductsService.create(data);
      res.status(201).json({
        status: true,
        message: "Success create product",
        data: result,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = req.params?.id;
      const data = req.body;
      const result = await ProductsService.update(id, data);
      res.status(200).json({
        status: true,
        message: "Success update product",
        data: result,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
  async destroy(req: Request, res: Response) {
    try {
      const id = req.params?.id;
      const result = await ProductsService.delete(id);
      res.status(200).json({
        status: true,
        message: "Success delete product",
        data: result,
      });
    } catch (error) {
      const err = error as MongooseError;
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
}

export default new ProductsController();
