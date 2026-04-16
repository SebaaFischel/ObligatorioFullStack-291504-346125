import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { usuarioDto } from "../dtos/usuario.dto.js";

export const doLogin = async ({ email, password }) => {

    const u = await User.findOne({ email: email });

    if (u) {

        const esValida = await bcrypt.compare(password, u.password);

        if (esValida) {

            const token = jwt.sign(
                { idUsu: u._id.toString(), rolUsu: u.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { token };
        }
    }


    throw new Error("no autorizado");
};

export const registerUser = async ({ name, username, email, password, role }) => {
    const contraHasheada = await bcrypt.hash(password, 10);
    const nuevoUsuario = {
        name,
        username,
        email,
        password: contraHasheada,
        role,
        plan: role === "user" ? "plus" : undefined
    };
    const usuarioGuardado = await User.create(nuevoUsuario);
    return usuarioDto(usuarioGuardado);
};