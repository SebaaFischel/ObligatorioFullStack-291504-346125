class PeliculaNoEncontradaError extends Error {
    constructor() {
        super("película no encontrada");
        this.code = 404;
    }
}

export { PeliculaNoEncontradaError };
