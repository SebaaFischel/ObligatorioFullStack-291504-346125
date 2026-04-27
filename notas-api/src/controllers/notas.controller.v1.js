import * as notasService from "../services/notas.service.v1.js";


const obtenerNotas = async (req, res) => {
    try {
        const {limit, page, prioridad, titulo } = req.query
        if (!limit || !page) {
            res.status(400).json({message: "debe enviar pagina y limite"})
            return
        }
        const notas = await notasService.obtenerNotasUsuario(page, limit, prioridad, titulo, req.idUsu)
        res.status(200).json(notas)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const obtenerNotaPorId = async (req, res) => {
    const idUsuario = req.idUsu;
    const idNota = req.params.id
    try {
        const nota = await notasService.obtenerNotaUsuarioPorId(idNota, idUsuario);
        res.status(200).json(nota);
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).json({ message: e.message })
    }
}

const crearNota = async (req, res) => {
    try {
        const nuevaNota = await notasService.crearNota(req.body, req.idUsu) //me devuelve la NOTA CREADA
        res.status(201).json(nuevaNota);
    } catch (e) {
        res.status(500).json({ message: "error al crear la nota" });
    }
}

const modificarNota = async (req, res) => {
    const idNota = req.params.id

    const body = req.body

    try {
        const notaModificada = await notasService.modificarNotaUsuarioPorIdNota(idNota, body, req.idUsu)
        res.status(200).json(notaModificada);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const elminarNota = async (req, res) => {
    const idNota = req.params.id
    try {
        await notasService.eliminarNotaUsuarioPorId(idNota, req.idUsu)
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const decorarTitulo = async (req, res) => {
    const idNota = req.params.id

    try {
        const tituloMejorado = await notasService.decorarTitulo(idNota, req.idUsu)
        res.status(200).json(tituloMejorado);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
}

const subirImagen = async (req, res) => {
    const idNota = req.params.id
    const img = req.file

    console.log(idNota)
    //viene algo en el file --> 400 -> bad_request
    if (!img) {
        res.status(400).json({ message: "no se envió imagen" })
        return;
    }
    //validar que lo que llega es realmente una imagen
    // "image/"
    if (!img.mimetype.startsWith("image/")) {
        res.status(400).json({ message: "debe ser un archivo de imagen" })
        return;
    }

    try {
        const nota = await notasService.agregarImagen(img, idNota, req.idUsu)
        res.status(200).json(nota)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "error al subir imagen" })
    }



}

export {
    obtenerNotas,
    obtenerNotaPorId,
    crearNota,
    modificarNota,
    elminarNota,
    decorarTitulo,
    subirImagen
}