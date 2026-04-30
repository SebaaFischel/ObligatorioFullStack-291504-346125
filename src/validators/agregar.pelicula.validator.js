import Joi from "joi";

const agregarPeliculaSchema = Joi.object({
    tmdbId: Joi.number().integer().required().messages({
        "number.base": "El ID de TMDB debe ser un número",
        "any.required": "El ID de TMDB es obligatorio"
    }),
    rating: Joi.number().min(1).max(10).optional().messages({
        "number.min": "El rating mínimo es 1",
        "number.max": "El rating máximo es 10"
    }),
    reseña: Joi.string().allow("").optional().messages({
        "string.base": "La reseña debe ser un texto"
    }),
    idCategoria: Joi.string().required().messages({
        "any.required": "La categoría es obligatoria",
        "string.empty": "La categoría no puede estar vacía"
    })
});

export { agregarPeliculaSchema };
