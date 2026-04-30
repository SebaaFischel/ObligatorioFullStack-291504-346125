import Joi from "joi";

const optimizarReseñaSchema = Joi.object({
    reseña: Joi.string().min(5).required().messages({
        "string.min": "La reseña debe tener al menos 5 caracteres",
        "any.required": "La reseña es obligatoria",
        "string.empty": "La reseña no puede estar vacía"
    })
});

export { optimizarReseñaSchema };
