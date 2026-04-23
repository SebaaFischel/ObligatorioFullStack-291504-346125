import { crearCategoriaSchema } from "../validators/crear.categoria.validator.js";

const crearCategoriaValidatorMiddleware = (req, res, next) => {
    const { error } = crearCategoriaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { crearCategoriaValidatorMiddleware };
