import express from "express";
import { login, registrar } from "../controllers/auth.controller.js";
import { registrarUsuarioValidatorMiddleware } from "../middlewares/registrar.usuario.validator.middleware.js";
import { loginUsuarioValidatorMiddleware } from "../middlewares/login.usuario.validator.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registrarUsuarioValidatorMiddleware, registrar);
authRouter.post("/login", loginUsuarioValidatorMiddleware, login);

export { authRouter };