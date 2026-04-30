import { Pelicula } from "../modelos/pelicula.model.js";
import { Usuario } from "../modelos/usuario.model.js";
import { obtenerDetallePeliculaPorId } from "./tmdb.service.v1.js";
import { PeliculaNoEncontradaError } from "../errors/PeliculaNoEncontradaError.js";
import { UsuarioNoEncontradoError } from "../errors/UsuarioNoEncontradoError.js";
import { LimitePeliculasAlcanzadoError } from "../errors/LimitePeliculasAlcanzadoError.js";
import { PeliculaDuplicadaError } from "../errors/PeliculaDuplicadaError.js";
import { v2 as cloudinary } from 'cloudinary';

const obtenerPeliculasUsuario = async (idUsuario, pagina = 1, limite = 10, idCategoria, titulo) => {
    const query = { idUsuario };

    if (idCategoria) {
        query.idCategoria = idCategoria;
    }

    if (titulo) {
        query.titulo = { $regex: titulo, $options: "i" };
    }

    const skip = (pagina - 1) * limite;
    const peliculas = await Pelicula.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite)
        .populate("idCategoria", "nombre");

    const total = await Pelicula.countDocuments(query);

    return {
        peliculas,
        paginacion: {
            total,
            pagina: Number(pagina),
            limite: Number(limite),
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

const agregarImagenPelicula = async (img, idPelicula, idUsu) => {
    const pelicula = await Pelicula.findOne({ _id: idPelicula, idUsuario: idUsu });
    if (!pelicula) {
        throw new PeliculaNoEncontradaError();
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const imgBase64 = Buffer.from(img.buffer).toString("base64");
    const uri = "data:" + img.mimetype + ";base64," + imgBase64;
    try {
        const result = await cloudinary.uploader.upload(uri);
        pelicula.imagenURL = result.secure_url;
        return await pelicula.save();
    } catch (e) {
        console.log("Error al subir a Cloudinary:", e);
        throw new Error("Error al subir la imagen a la nube");
    }
};

export {
    obtenerPeliculasUsuario,
    agregarPeliculaUsuario,
    actualizarPeliculaUsuario,
    eliminarPeliculaUsuario,
    agregarImagenPelicula
};
