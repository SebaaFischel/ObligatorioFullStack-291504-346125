import express from "express";
import { 
    obtenerPeliculas, 
    agregarPelicula, 
    actualizarPelicula, 
    eliminarPelicula 
} from "../controllers/peliculas.controller.v1.js";
import { agregarPeliculaValidatorMiddleware } from "../middlewares/agregar.pelicula.validator.middleware.js";

const peliculasRouter = express.Router();

peliculasRouter.get("/", obtenerPeliculas);
peliculasRouter.post("/", agregarPeliculaValidatorMiddleware, agregarPelicula);
peliculasRouter.put("/:tmdbId", actualizarPelicula);
peliculasRouter.delete("/:tmdbId", eliminarPelicula);

export { peliculasRouter };
