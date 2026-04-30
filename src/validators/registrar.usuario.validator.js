import Joi from "joi";

const registrarUsuarioSchema = Joi.object({
    nombre: Joi.string().required().messages({
        "any.required": "El nombre es obligatorio",
        "string.empty": "El nombre no puede estar vacío"
    }),
    nombreUsuario: Joi.string().alphanum().min(3).max(30).required().messages({
        "string.alphanum": "El nombre de usuario solo debe contener caracteres alfanuméricos",
        "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
        "string.max": "El nombre de usuario no debe exceder los 30 caracteres",
        "any.required": "El nombre de usuario es obligatorio",
        "string.empty": "El nombre de usuario no puede estar vacío"
    }),
    mail: Joi.string().email().required().messages({
        "string.email": "El formato del correo electrónico no es válido",
        "any.required": "El correo electrónico es obligatorio",
        "string.empty": "El correo electrónico no puede estar vacío"
    }),
    contrasena: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
        "string.pattern.base": "La contraseña debe tener entre 3 y 30 caracteres alfanuméricos",
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no puede estar vacía"
    })
});

export { registrarUsuarioSchema };
