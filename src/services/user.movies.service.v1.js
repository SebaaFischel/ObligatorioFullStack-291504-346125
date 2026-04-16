import UserMovie from "../models/user.movie.js";
import User from "../models/user.js";
import { obtenerDetallePeliculaPorId } from "./tmdb.service.v1.js";

export const addUserMovie = async (datosEntrada, userId) => {
    const usuario = await User.findById(userId);
    if (!usuario) throw new Error("Usuario no encontrado");
    if (usuario.plan === "plus") {
        const cantidadPeliculas = await UserMovie.countDocuments({ userId });
        if (cantidadPeliculas >= 4) {
            throw new Error("Límite alcanzado: Los usuarios Plus solo pueden tener 4 películas.");
        }
    }
    const detallesTMDB = await obtenerDetallePeliculaPorId(datosEntrada.tmdbId);

    const nuevaPelicula = await UserMovie.create({
        userId: userId,
        tmdbId: datosEntrada.tmdbId,
        titulo: detallesTMDB.titulo,
        rutaPoster: detallesTMDB.rutaPoster,
        rating: datosEntrada.rating,
        review: datosEntrada.review,
        categoryId: datosEntrada.categoryId
    });
    return nuevaPelicula;
};
