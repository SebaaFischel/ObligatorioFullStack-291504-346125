import express from "express";
import { 
    obtenerCategorias, 
    crearCategoria, 
    actualizarCategoria, 
    eliminarCategoria 
} from "../controllers/categorias.controller.js";
import { crearCategoriaValidatorMiddleware } from "../middlewares/crear.categoria.validator.middleware.js";

const categoriasRouter = express.Router();

categoriasRouter.get("/", obtenerCategorias);
categoriasRouter.post("/", crearCategoriaValidatorMiddleware, crearCategoria);
categoriasRouter.put("/:id", actualizarCategoria);
categoriasRouter.delete("/:id", eliminarCategoria);

export { categoriasRouter };
