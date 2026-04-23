class PeliculaDuplicadaError extends Error {
    constructor() {
        super("Esta película ya existe en tu biblioteca");
        this.code = 409;
    }
}

export { PeliculaDuplicadaError };
