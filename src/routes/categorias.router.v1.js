import express from "express";
import {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../controllers/categorias.controller.js";
import { crearCategoriaValidatorMiddleware } from "../middlewares/crear.categoria.validator.middleware.js";
import { esAdmin } from "../middlewares/role.middleware.js";

const categoriasRouter = express.Router();

categoriasRouter.get("/", obtenerCategorias);
categoriasRouter.post("/", esAdmin, crearCategoriaValidatorMiddleware, crearCategoria);
categoriasRouter.put("/:id", esAdmin, actualizarCategoria);
categoriasRouter.delete("/:id", esAdmin, eliminarCategoria);

export { categoriasRouter };
