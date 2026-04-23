const validarRolAdmin = (req, res, next) => {
    if (req.rolUsu != "admin") {
        res.status(403).json({ message: "no permitido" })
        return;
    }
    next()
}

export { validarRolAdmin }