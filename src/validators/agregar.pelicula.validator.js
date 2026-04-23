import Joi from "joi";

const agregarPeliculaSchema = Joi.object({
    tmdbId: Joi.number().integer().required(),
    rating: Joi.number().min(1).max(10).optional(),
    reseña: Joi.string().allow("").optional(),
    idCategoria: Joi.string().required()
});

export { agregarPeliculaSchema };
