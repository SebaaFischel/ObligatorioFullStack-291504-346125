import { buscarPeliculasEnTMDB } from "../services/tmdb.service.v1.js";

export const buscarPeliculas = async (req, res) => {
    try {
        const { busqueda } = req.query;
        if (!busqueda) return res.status(400).json({ message: "El parámetro de búsqueda es requerido" });

        const resultados = await buscarPeliculasEnTMDB(busqueda);
        res.status(200).json(resultados);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};