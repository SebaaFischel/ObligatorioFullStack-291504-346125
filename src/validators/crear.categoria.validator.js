import Joi from "joi";

const crearCategoriaSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().allow("").optional()
});

export { crearCategoriaSchema };
