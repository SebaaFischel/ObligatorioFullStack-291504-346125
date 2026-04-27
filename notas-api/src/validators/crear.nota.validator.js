import Joi from "joi";

const crearNotaValidatorSchema = Joi.object({
    titulo: Joi.string().min(5).max(1000).required().messages({
        "string.max": "El titulo debe tener maximo 10 caracteres"
    }),
    texto: Joi.string().min(4).max(10).required(),
    prioridad: Joi.number().strict().integer().min(1).max(3)
})

export { crearNotaValidatorSchema }