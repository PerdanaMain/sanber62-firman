import { Router } from "express";
import CategoriesController from "../controller/categories.controller";
import { prefix } from "../utils/env";

const router = Router();

// CRUD Categories
router.get(prefix + "/categories", CategoriesController.index);
router.get(prefix + "/categories/:id", CategoriesController.show);
router.post(prefix + "/categories", CategoriesController.store);
router.put(prefix + "/categories/:id", CategoriesController.update);
router.delete(prefix + "/categories/:id", CategoriesController.destroy);

export default router;
