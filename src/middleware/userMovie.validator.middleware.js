import { userMovieSchema, userMovieUpdateSchema } from "../validators/userMovie.validator.js";

export const userMovieValidatorMiddleware = (req, res, next) => {
    const { error } = userMovieSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const userMovieUpdateValidatorMiddleware = (req, res, next) => {
    const { error } = userMovieUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};