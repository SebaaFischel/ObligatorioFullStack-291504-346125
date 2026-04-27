import * as peliculasService from "../services/peliculas.service.v1.js";

const obtenerPeliculas = async (req, res) => {
    try {
        const { pagina, limite, idCategoria, titulo } = req.query;
        const resultado = await peliculasService.obtenerPeliculasUsuario(
            req.idUsu,
            parseInt(pagina) || 1,
            parseInt(limite) || 10,
            idCategoria,
            titulo
        );
        res.status(200).json(resultado);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const agregarPelicula = async (req, res) => {
    try {
        const nuevaPelicula = await peliculasService.agregarPeliculaUsuario(req.body, req.idUsu);
        res.status(201).json(nuevaPelicula);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const actualizarPelicula = async (req, res) => {
    try {
        const tmdbId = req.params.tmdbId;
        const peliculaActualizada = await peliculasService.actualizarPeliculaUsuario(req.idUsu, tmdbId, req.body);
        res.status(200).json(peliculaActualizada);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const eliminarPelicula = async (req, res) => {
    try {
        const tmdbId = req.params.tmdbId;
        await peliculasService.eliminarPeliculaUsuario(req.idUsu, tmdbId);
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const subirImagen = async (req, res) => {
    try {
        const idPelicula = req.params.id;
        const peliculaActualizada = await peliculasService.agregarImagenPelicula(req.file, idPelicula, req.idUsu);
        res.status(200).json(peliculaActualizada);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

export {
    obtenerPeliculas,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula,
    subirImagen
};
