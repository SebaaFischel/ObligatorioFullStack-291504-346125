import { registrarUsuarioSchema } from "../validators/registrar.usuario.validator.js";

const registrarUsuarioValidatorMiddleware = (req, res, next) => {
    const { error } = registrarUsuarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { registrarUsuarioValidatorMiddleware };
