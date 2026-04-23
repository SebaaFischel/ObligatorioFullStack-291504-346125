import Joi from "joi";

const loginUsuarioSchema = Joi.object({
    mail: Joi.string().email().required(),
    contrasena: Joi.string().required()
});

export { loginUsuarioSchema };
