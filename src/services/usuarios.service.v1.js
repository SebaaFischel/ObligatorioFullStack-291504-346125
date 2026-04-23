import { Usuario } from "../modelos/usuario.model.js";
import { UsuarioNoEncontradoError } from "../errors/UsuarioNoEncontradoError.js";

const upgradePlan = async (userId) => {
    const usuario = await Usuario.findById(userId);
    if (!usuario) throw new UsuarioNoEncontradoError();
    
    if (usuario.plan === "premium") throw new Error("Ya tienes contratado el plan Premium");
    
    usuario.plan = "premium";
    await usuario.save();
    
    return {
        message: `¡Felicidades ${usuario.nombreUsuario}! Ahora eres un usuario Premium.`,
        plan: usuario.plan
    };
};

export { upgradePlan };
