import { loginSchema } from "../validators/login.validator.js";

export const loginValidatorMiddleware = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Datos inválidos",
            errors: error.details.map(d => d.message)
        });
    }

    next();
};