import { Router } from "express";
import CategoriesController from "../controller/categories.controller";
import ProductController from "../controller/products.controller";
import { prefix } from "../utils/env";

const router = Router();

// CRUD Categories
router.get(prefix + "/categories", CategoriesController.index);
router.get(prefix + "/categories/:id", CategoriesController.show);
router.post(prefix + "/categories", CategoriesController.store);
router.put(prefix + "/categories/:id", CategoriesController.update);
router.delete(prefix + "/categories/:id", CategoriesController.destroy);

// CRUD Products
router.get(prefix + "/products", ProductController.index);
router.get(prefix + "/products/:id", ProductController.show);
router.post(prefix + "/products", ProductController.store);
router.put(prefix + "/products/:id", ProductController.update);
router.delete(prefix + "/products/:id", ProductController.destroy);

export default router;
