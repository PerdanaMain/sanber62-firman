import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import CategoriesService from "../services/categories.service";

class CategoriesController {
  async index(req: Request, res: Response) {
    try {
      const result = await CategoriesService.findAll();
      res.status(200).json({
        status: true,
        message: "Success get all categories",
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
      const result = await CategoriesService.findById(id);
      res.status(200).json({
        status: true,
        message: "Success get category",
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
      const result = await CategoriesService.create(data);
      res.status(201).json({
        status: true,
        message: "Success create category",
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
      const result = await CategoriesService.update(id, data);
      res.status(200).json({
        status: true,
        message: "Success update category",
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
      const result = await CategoriesService.delete(id);
      res.status(200).json({
        status: true,
        message: "Success delete category",
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

export default new CategoriesController();
