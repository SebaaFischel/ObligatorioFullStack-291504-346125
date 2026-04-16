const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const buscarPeliculasEnTMDB = async (busqueda) => {
    const apiKey = process.env.TMDB_API_KEY;
    const respuesta = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(busqueda)}&language=es-ES`);
    const data = await respuesta.json();
    return data.results;
};
export const obtenerDetallePeliculaPorId = async (peliculaId) => {
    const apiKey = process.env.TMDB_API_KEY;
    const respuesta = await fetch(`${TMDB_BASE_URL}/movie/${peliculaId}?api_key=${apiKey}&language=es-ES`);
    const data = await respuesta.json();

    if (data.success === false) {
        throw new Error("No se encontró la película en TMDB");
    }
    return {
        titulo: data.title,
        rutaPoster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
    };
};