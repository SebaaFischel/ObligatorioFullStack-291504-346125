class UsuarioDuplicadoError extends Error {
    constructor() {
        super("El nombre de usuario o mail ya están registrados");
        this.code = 409;
    }
}

export { UsuarioDuplicadoError };
