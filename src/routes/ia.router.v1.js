import express from "express";
import { optimizarReseña } from "../controllers/ia.controller.v1.js";

const iaRouter = express.Router();

// Cambiamos 'reseña' por 'resena' para evitar problemas de encoding en la URL
iaRouter.post("/optimizar-resena", optimizarReseña);

export { iaRouter };
