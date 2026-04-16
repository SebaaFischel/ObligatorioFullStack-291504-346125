import express from "express";
import { login, register } from "../controllers/auth.controller.v1.js";
import { registerValidatorMiddleware } from "../middleware/register.validator.middleware.js";
import { loginValidatorMiddleware } from "../middleware/login.validator.middleware.js";

const router = express.Router();

router.post("/register", registerValidatorMiddleware, register);
router.post("/login", loginValidatorMiddleware, login);

export default router;