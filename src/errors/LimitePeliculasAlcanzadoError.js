class LimitePeliculasAlcanzadoError extends Error {
    constructor() {
        super("Límite alcanzado: Los usuarios Plus solo pueden tener 4 películas.");
        this.code = 403;
    }
}

export { LimitePeliculasAlcanzadoError };
