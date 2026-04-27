import express from "express"
import { crearNota, decorarTitulo, elminarNota, modificarNota, obtenerNotaPorId, obtenerNotas, subirImagen } from "../controllers/notas.controller.v1.js";
import { validarCrearNotaMiddleware } from "../middlewares/crear.nota.validator.middleware.js";
import { validarRolAdmin } from "../middlewares/admin.validator.middleware.js";
import multer from "multer";

const notasRouterV1 = express.Router();

const upload = multer();

notasRouterV1.get("/notas", obtenerNotas)
notasRouterV1.get("/notas/:id", obtenerNotaPorId)
notasRouterV1.post("/notas", validarCrearNotaMiddleware, crearNota)
notasRouterV1.put("/notas/:id", modificarNota)
notasRouterV1.delete("/notas/:id", elminarNota)
notasRouterV1.get("/notas/:id/decorar-titulo", decorarTitulo)
notasRouterV1.post("/notas/:id/imagen", upload.single("img"), subirImagen)

export { notasRouterV1 }