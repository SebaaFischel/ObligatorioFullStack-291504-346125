class CategoriaDuplicadaError extends Error {
    constructor() {
        super("Esta categoría ya existe");
        this.code = 409;
    }
}

export { CategoriaDuplicadaError };
