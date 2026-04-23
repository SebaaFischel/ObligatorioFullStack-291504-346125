class CategoriaNoEncontradaError extends Error {
    constructor() {
        super("categoría no encontrada");
        this.code = 404;
    }
}

export { CategoriaNoEncontradaError };
