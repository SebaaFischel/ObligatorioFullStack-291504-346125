import { registerSchema } from "../validators/register.validator.js";

export const registerValidatorMiddleware = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Datos inválidos",
            errors: error.details.map(d => d.message)
        });
    }

    next();
};