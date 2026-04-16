import express from "express";

import { buscarPeliculas } from "../controllers/tmdb.controller.v1.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/buscar", authMiddleware, buscarPeliculas);
export default router;