import { Router } from "express";
import CategoriesController from "../controller/categories.controller";
import ProductsController from "../controller/products.controller";
import AuthController from "../controller/auth.controller";
import OrdersController from "../controller/orders.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import { prefix } from "../utils/env";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// AUTH
router.post(prefix + "/register", AuthController.register);
router.post(prefix + "/login", AuthController.login);

// CRUD Categories
router.get(prefix + "/categories", CategoriesController.index);
router.get(prefix + "/categories/:id", CategoriesController.show);
router.post(prefix + "/categories", CategoriesController.store);
router.put(prefix + "/categories/:id", CategoriesController.update);
router.delete(prefix + "/categories/:id", CategoriesController.destroy);

// CRUD Products
router.get(prefix + "/products", ProductsController.index);
router.get(prefix + "/products/:id", ProductsController.show);
router.post(prefix + "/products", ProductsController.store);
router.put(prefix + "/products/:id", ProductsController.update);
router.delete(prefix + "/products/:id", ProductsController.destroy);

// CRUD Orders
router.get(
  prefix + "/orders",
  authMiddleware.verifyToken,
  OrdersController.index
);
router.post(
  prefix + "/orders",
  authMiddleware.verifyToken,
  OrdersController.store
);

export default router;
