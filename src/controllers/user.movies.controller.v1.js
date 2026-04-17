import * as userMoviesService from "../services/user.movies.service.v1.js";

export const addMovie = async (req, res) => {
    try {
        const movie = await userMoviesService.addUserMovie(req.body, req.idUsu);
        res.status(201).json(movie);
    } catch (e) {
        res.status(403).json({ message: e.message });
    }
};

export const getMovies = async (req, res) => {
    try {
        const movies = await userMoviesService.getUserMovies(req.idUsu);
        if (movies.length === 0) {
            return res.status(200).json({ message: "No tiene peliculas en su biblioteca" });
        }
        res.status(200).json(movies);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const peliculaEliminada = await userMoviesService.deleteUserMovie(req.idUsu, Number(req.params.tmdbId));
        res.status(200).json({
            message: `Pelicula ${peliculaEliminada.titulo} eliminada de la biblioteca del usuario`
        });
    } catch (e) {
        if (e.message === "No se encontró la película en la biblioteca del usuario") {
            return res.status(404).json({ message: e.message });
        }
        res.status(500).json({ message: e.message });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movie = await userMoviesService.updateUserMovie(
            req.idUsu,
            Number(req.params.tmdbId),
            req.body
        );
        res.status(200).json(movie);
    } catch (e) {

        const status = e.message.includes("No se encontró") ? 404 : 400;
        res.status(status).json({ message: e.message });
    }
};