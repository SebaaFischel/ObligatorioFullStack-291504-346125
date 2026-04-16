import { categorySchema } from "../validators/category.validator.js";
export const categoryValidatorMiddleware = (req, res, next) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};