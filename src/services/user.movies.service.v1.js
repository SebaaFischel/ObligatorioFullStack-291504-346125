import UserMovie from "../models/user.movie.js";
import User from "../models/user.js";
import { obtenerDetallePeliculaPorId } from "./tmdb.service.v1.js";

export const getUserMovies = async (userId) => {
    return await UserMovie.find({ userId }).sort({ createdAt: -1 });
};

export const addUserMovie = async (datosEntrada, userId) => {
    const usuario = await User.findById(userId);
    if (!usuario) throw new Error("Usuario no encontrado");
    // Lógica refinada de límites: premium SIEMPRE es ilimitado
    if (usuario.plan === "plus") {
        const cantidadPeliculas = await UserMovie.countDocuments({ userId });
        if (cantidadPeliculas >= 4) {
            throw new Error("Límite alcanzado: Los usuarios Plus solo pueden tener 4 películas.");
        }
    }
    const detallesTMDB = await obtenerDetallePeliculaPorId(datosEntrada.tmdbId);
    try {
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
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Esta película ya existe en tu biblioteca");
        }
        throw error;
    }
};
export const updateUserMovie = async (userId, tmdbId, datos) => {
    const peliculaActualizada = await UserMovie.findOneAndUpdate(
        { userId, tmdbId },
        {
            rating: datos.rating,
            review: datos.review,
            categoryId: datos.categoryId
        },
        { new: true, runValidators: true }
    );
    if (!peliculaActualizada) {
        throw new Error("No se encontró la película para actualizar");
    }
    return peliculaActualizada;
};

export const deleteUserMovie = async (userId, tmdbId) => {
    const peliculaEliminada = await UserMovie.findOneAndDelete({ userId, tmdbId });

    if (!peliculaEliminada) {
        throw new Error("No se encontró la película en la biblioteca del usuario");
    }

    return peliculaEliminada;
};
