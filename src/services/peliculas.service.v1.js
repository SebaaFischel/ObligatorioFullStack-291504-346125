import { Pelicula } from "../modelos/pelicula.model.js";
import { Usuario } from "../modelos/usuario.model.js";
import { obtenerDetallePeliculaPorId } from "./tmdb.service.v1.js";
import { PeliculaNoEncontradaError } from "../errors/PeliculaNoEncontradaError.js";
import { UsuarioNoEncontradoError } from "../errors/UsuarioNoEncontradoError.js";
import { LimitePeliculasAlcanzadoError } from "../errors/LimitePeliculasAlcanzadoError.js";
import { PeliculaDuplicadaError } from "../errors/PeliculaDuplicadaError.js";

const obtenerPeliculasUsuario = async (idUsuario, pagina = 1, limite = 10) => {
    const skip = (pagina - 1) * limite;
    const peliculas = await Pelicula.find({ idUsuario })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite)
        .populate("idCategoria", "nombre");
    
    const total = await Pelicula.countDocuments({ idUsuario });
    
    return {
        peliculas,
        paginacion: {
            total,
            pagina,
            limite,
            paginasTotales: Math.ceil(total / limite)
        }
    };
};

const agregarPeliculaUsuario = async (datosEntrada, idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) throw new UsuarioNoEncontradoError();

    if (usuario.plan === "plus") {
        const cantidadPeliculas = await Pelicula.countDocuments({ idUsuario });
        if (cantidadPeliculas >= 4) {
            throw new LimitePeliculasAlcanzadoError();
        }
    }

    const detallesTMDB = await obtenerDetallePeliculaPorId(datosEntrada.tmdbId);
    
    try {
        const nuevaPelicula = await Pelicula.create({
            idUsuario: idUsuario,
            tmdbId: datosEntrada.tmdbId,
            titulo: detallesTMDB.titulo,
            rutaPoster: detallesTMDB.rutaPoster,
            rating: datosEntrada.rating,
            reseña: datosEntrada.reseña,
            idCategoria: datosEntrada.idCategoria
        });
        return nuevaPelicula;
    } catch (error) {
        if (error.code === 11000) {
            throw new PeliculaDuplicadaError();
        }
        throw error;
    }
};

const actualizarPeliculaUsuario = async (idUsuario, tmdbId, datos) => {
    const peliculaActualizada = await Pelicula.findOneAndUpdate(
        { idUsuario, tmdbId },
        {
            rating: datos.rating,
            reseña: datos.reseña,
            idCategoria: datos.idCategoria
        },
        { new: true, runValidators: true }
    );

    if (!peliculaActualizada) {
        throw new PeliculaNoEncontradaError();
    }

    return peliculaActualizada;
};

const eliminarPeliculaUsuario = async (idUsuario, tmdbId) => {
    const peliculaEliminada = await Pelicula.findOneAndDelete({ idUsuario, tmdbId });

    if (!peliculaEliminada) {
        throw new PeliculaNoEncontradaError();
    }

    return peliculaEliminada;
};

export {
    obtenerPeliculasUsuario,
    agregarPeliculaUsuario,
    actualizarPeliculaUsuario,
    eliminarPeliculaUsuario
};
