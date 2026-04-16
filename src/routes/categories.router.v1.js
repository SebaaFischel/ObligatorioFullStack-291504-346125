import express from "express";
import { getCategories, postCategory, putCategory, deleteCategory } from "../controllers/categories.controller.v1.js";
import { categoryValidatorMiddleware } from "../middleware/category.validator.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { esAdmin } from "../middleware/role.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getCategories);
router.post("/", esAdmin, categoryValidatorMiddleware, postCategory);
router.put("/:id", esAdmin, categoryValidatorMiddleware, putCategory);
router.delete("/:id", esAdmin, deleteCategory);

export default router;