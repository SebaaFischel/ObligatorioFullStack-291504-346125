import Joi from "joi";

const optimizarReseñaSchema = Joi.object({
    reseña: Joi.string().min(5).required()
});

export { optimizarReseñaSchema };
