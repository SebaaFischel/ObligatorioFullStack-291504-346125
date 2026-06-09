import express from "express";
import multer from "multer";
import {
    obtenerPeliculas,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula,
    subirImagen,
    obtenerEstadisticas   
} from "../controllers/peliculas.controller.v1.js";
import { agregarPeliculaValidatorMiddleware } from "../middlewares/agregar.pelicula.validator.middleware.js";

const peliculasRouter = express.Router();
const upload = multer();

peliculasRouter.get("/", obtenerPeliculas);
peliculasRouter.get("/estadisticas", obtenerEstadisticas);
peliculasRouter.post("/", agregarPeliculaValidatorMiddleware, agregarPelicula);
peliculasRouter.put("/:tmdbId", actualizarPelicula);
peliculasRouter.delete("/:tmdbId", eliminarPelicula);
peliculasRouter.post("/imagen/:id", upload.single("img"), subirImagen);

export { peliculasRouter };
