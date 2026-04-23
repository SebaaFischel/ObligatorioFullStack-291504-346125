import express from "express"
import { obtenerTodasLasNotas } from "../controllers/notas.admin.controller.js";

const notasAdminRouterV1 = express.Router();

notasAdminRouterV1.get("/notas", obtenerTodasLasNotas)

export { notasAdminRouterV1 }