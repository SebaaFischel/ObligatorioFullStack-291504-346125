import Joi from "joi";

const crearCategoriaSchema = Joi.object({
    nombre: Joi.string().required().messages({
        "any.required": "El nombre de la categoría es obligatorio",
        "string.empty": "El nombre no puede estar vacío"
    }),
    descripcion: Joi.string().allow("").optional().messages({
        "string.base": "La descripción debe ser un texto"
    })
});

export { crearCategoriaSchema };
