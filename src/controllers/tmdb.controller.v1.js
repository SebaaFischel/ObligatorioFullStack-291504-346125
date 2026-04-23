import * as tmdbService from "../services/tmdb.service.v1.js";

const buscarPelicula = async (req, res) => {
    try {
        const query = req.query.query;
        const results = await tmdbService.buscarPeliculasEnTMDB(query);
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const obtenerDetalle = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await tmdbService.obtenerDetallePeliculaPorId(id);
        res.status(200).json(movie);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
};

export { buscarPelicula, obtenerDetalle };