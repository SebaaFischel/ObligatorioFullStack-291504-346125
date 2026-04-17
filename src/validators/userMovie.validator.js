import Joi from "joi";

export const userMovieSchema = Joi.object({
    tmdbId: Joi.number().required(),
    rating: Joi.number().min(1).max(10),
    review: Joi.string().max(1000).allow(""),
    categoryId: Joi.string().required()
});

export const userMovieUpdateSchema = Joi.object({
    rating: Joi.number().min(1).max(10),
    review: Joi.string().max(1000).allow(""),
    categoryId: Joi.string()
});