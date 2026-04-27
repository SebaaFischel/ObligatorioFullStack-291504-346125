import { obtenerNotasUsuariosAdmin } from "../services/notas.service.v1.js"

const obtenerTodasLasNotas = async (req, res) => {
    const notasUsuarios = await obtenerNotasUsuariosAdmin()   
    res.status(200).json(notasUsuarios);
}

export { obtenerTodasLasNotas }