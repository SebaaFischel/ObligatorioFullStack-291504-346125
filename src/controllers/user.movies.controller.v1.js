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
        res.status(200).json(movies);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};