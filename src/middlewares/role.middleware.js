export const esAdmin = (req, res, next) => {

    if (req.rolUsu !== "admin") {
        return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador" });
    }

    next();
};
