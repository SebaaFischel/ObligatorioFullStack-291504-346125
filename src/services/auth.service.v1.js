import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario } from "../modelos/usuario.model.js";
import { usuarioDto } from "../dtos/usuario.dto.js";
import { CredencialesInvalidasError } from "../errors/CredencialesInvalidasError.js";
import { UsuarioDuplicadoError } from "../errors/UsuarioDuplicadoError.js";

const doLogin = async ({ mail, contrasena }) => {

    const u = await Usuario.findOne({ mail: mail });

    if (u) {
        const esValida = await bcrypt.compare(contrasena, u.contrasena);

        if (esValida) {
            const token = jwt.sign(
                { idUsu: u._id.toString(), rolUsu: u.rol },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { token };
        }
    }

    throw new CredencialesInvalidasError();
};

const registerUser = async ({ nombre, nombreUsuario, mail, contrasena, rol }) => {
    try {
        const contraHasheada = await bcrypt.hash(contrasena, 10);
        const nuevoUsuario = {
            nombre,
            nombreUsuario,
            mail,
            contrasena: contraHasheada,
            rol: "user",
            plan: "plus"
        };

        const usuarioGuardado = await Usuario.create(nuevoUsuario);
        return usuarioDto(usuarioGuardado);
    } catch (error) {
        if (error.code === 11000) {
            throw new UsuarioDuplicadoError();
        }
        throw error;
    }
};

export { doLogin, registerUser };