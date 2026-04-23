import express from "express";
import { cambiarPlan } from "../controllers/usuarios.controller.js";

const usuariosRouter = express.Router();

usuariosRouter.put("/upgrade", cambiarPlan);

export { usuariosRouter };
