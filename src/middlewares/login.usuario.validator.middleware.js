import { loginUsuarioSchema } from "../validators/login.usuario.validator.js";

const loginUsuarioValidatorMiddleware = (req, res, next) => {
    const { error } = loginUsuarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { loginUsuarioValidatorMiddleware };
