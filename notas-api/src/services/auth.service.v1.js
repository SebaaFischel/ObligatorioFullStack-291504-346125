import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../modelos/user.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"

const doLogin = async ({ usuario, pass }) => {
    const u = await Usuario.findOne({ nombreUsuario: usuario }) // query de busqueda
    if (u) {
        //bcrypt.compare --> true/false
        const esValida = await bcrypt.compare(pass, u.contrasena)
        if (esValida) {
            //crar el token jwt
            //primer parametro: PAYLOAD
            const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            //return {token: token}
            return { token }
        }
    }

    throw new Error("no autorizado");
}

const registrarUsuario = async ({ nombreUsuario, nombre, apellido, contrasena, mail }) => {

    const contraHasheada = await bcrypt.hash(contrasena, 10);

    console.log(contraHasheada);
    const nuevoUsuario = {
        nombreUsuario,
        nombre,
        apellido,
        contrasena: contraHasheada,
        mail,
        rol: "usuario"
    }
    //usuarios.push(nuevoUsuario);
    const usuarioGuardado = await Usuario.create(nuevoUsuario);

    const usuarioDTO = usuarioDto(usuarioGuardado)
    
    //jwt.sign
    //nuevoUsuario.token = 
    return usuarioDTO;
}

export { doLogin, registrarUsuario }