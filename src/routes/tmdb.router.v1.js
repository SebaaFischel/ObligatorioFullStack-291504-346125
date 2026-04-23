import express from "express";
import { buscarPelicula, obtenerDetalle } from "../controllers/tmdb.controller.v1.js";

const tmdbRouter = express.Router();

tmdbRouter.get("/search", buscarPelicula);
tmdbRouter.get("/movie/:id", obtenerDetalle);

export { tmdbRouter };