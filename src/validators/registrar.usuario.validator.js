import Joi from "joi";

const registrarUsuarioSchema = Joi.object({
    nombre: Joi.string().required(),
    nombreUsuario: Joi.string().alphanum().min(3).max(30).required(),
    mail: Joi.string().email().required(),
    contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

export { registrarUsuarioSchema };
