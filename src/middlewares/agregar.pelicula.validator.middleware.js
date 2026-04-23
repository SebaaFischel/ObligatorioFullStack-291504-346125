import { agregarPeliculaSchema } from "../validators/agregar.pelicula.validator.js";

const agregarPeliculaValidatorMiddleware = (req, res, next) => {
    const { error } = agregarPeliculaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { agregarPeliculaValidatorMiddleware };
