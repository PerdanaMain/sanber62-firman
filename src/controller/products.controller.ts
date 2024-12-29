import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import ProductsService from "../services/products.service";
import { IPaginationQuery } from "../utils/interfaces";

class ProductsController {
  async index(req: Request, res: Response) {
    /**
     #swagger.tags = ['Products']
     #swagger.security = [{
      "bearerAuth": []
     }]
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/ProductCreateRequest"
      }
     }
     */
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;
      const query = {};

      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        });
      }

      const result = await ProductsService.findAll(query, limit, page);
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
    /**
     #swagger.tags = ['Products']
     */
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
    /**
     #swagger.tags = ['Products']
     #swagger.security = [{
      "bearerAuth": []
     }]
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/ProductCreateRequest"
      }
     }
    */
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
