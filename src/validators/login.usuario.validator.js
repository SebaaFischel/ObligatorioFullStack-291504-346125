import Joi from "joi";

const loginUsuarioSchema = Joi.object({
    mail: Joi.string().email().required().messages({
        "string.email": "El formato del correo electrónico no es válido",
        "any.required": "El correo electrónico es obligatorio",
        "string.empty": "El correo electrónico no puede estar vacío"
    }),
    contrasena: Joi.string().required().messages({
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no puede estar vacía"
    })
});

export { loginUsuarioSchema };
