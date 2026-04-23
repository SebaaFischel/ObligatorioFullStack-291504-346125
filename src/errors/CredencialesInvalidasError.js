class CredencialesInvalidasError extends Error {
    constructor() {
        super("mail o contraseña incorrectos");
        this.code = 401;
    }
}

export { CredencialesInvalidasError };
