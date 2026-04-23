import { optimizarReseñaSchema } from "../validators/optimizar.resena.validator.js";

const optimizarReseñaValidatorMiddleware = (req, res, next) => {
    const { error } = optimizarReseñaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "La reseña debe tener al menos 5 caracteres." });
    }
    next();
};

export { optimizarReseñaValidatorMiddleware };
