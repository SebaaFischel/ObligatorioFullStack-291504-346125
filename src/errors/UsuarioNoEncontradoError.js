class UsuarioNoEncontradoError extends Error {
    constructor() {
        super("usuario no encontrado");
        this.code = 404;
    }
}

export { UsuarioNoEncontradoError };
