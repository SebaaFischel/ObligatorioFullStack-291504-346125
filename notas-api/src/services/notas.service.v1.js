import { NotaNoEncontradaError } from "../errors/NotaNoEncontradaError.js"
import { Nota } from "../modelos/nota.model.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from 'cloudinary'

const obtenerNotasUsuario = async (page, limit, prioridad, titulo, idUsuario) => {

    const query = { idUsuario: idUsuario }

    if (prioridad) {
        //hago algo = agregarlo a la query
        query.prioridad = Number(prioridad)
    }

    if (titulo) {
        query.titulo = { $regex: titulo, $options: "i" }
    }

    const total = await Nota.countDocuments(query)
    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit //0
    //total: 10 
    //vamos de a 5

    
    try {
        const notas = await Nota.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        return { notas, limit, total, totalPaginas: Math.ceil(total/limit) }
    } catch (e) {
        console.log("error al obtener notas de usaurio", e)
        throw new Error("error obteniendo las notas del usuario")
    }
}

const obtenerNotaUsuarioPorId = async (idNota, idUsuario) => {
    //return notas.find(nota => nota.id == id)
    //Nota.findOne({ id: id })
    try {
        const nota = await Nota.findOne({ _id: idNota, idUsuario: idUsuario }).populate("idUsuario", "nombreUsuario nombre apellido -_id")
        if (nota) {
            return nota
        }
        throw new NotaNoEncontradaError();
    } catch (e) {
        throw e;
    }
}

const crearNota = async ({ titulo, texto, imagen, favorito, prioridad }, idUsuario) => {
    //ir a la base a buscar el usuario
    //si el usuario es plan premium...
    // si es plus? 
    const cantidadDocumentos = await Nota.countDocuments({ idUsuario: idUsuario })
    console.log("cantidad de documentos: ", cantidadDocumentos)

    const nuevaNota = {
        titulo,
        texto,
        imagen,
        favorito: favorito || false,
        prioridad,
        idUsuario
    }
    //notas.push(nuevaNota);
    const notaGuardada = await Nota.create(nuevaNota)
    return notaGuardada;
}

const modificarNotaUsuarioPorIdNota = async (idNota, body, idUsuario) => {
    const notaModificada = await Nota.findOneAndUpdate(
        { _id: idNota, idUsuario: idUsuario },
        body,
        { returnDocument: "after", runValidators: true }
    )

    if (notaModificada) {
        return notaModificada;
    }

    throw new NotaNoEncontradaError();
}

const eliminarNotaUsuarioPorId = async (idNota, idUsuario) => {
    const nota = await Nota.findOneAndDelete({ _id: idNota, idUsuario: idUsuario })
    if (!nota) {
        throw new NotaNoEncontradaError();
    }
}

const decorarTitulo = async (idNota, idUsuario) => {
    const nota = Nota.findOne({ _id: idNota, idUsuario: idUsuario });

    if (!nota) {
        throw new NotaNoEncontradaError();
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        // Instrucción de sistema para definir el comportamiento "editor"
        systemInstruction: "Eres un editor de títulos para una app de notas minimalista. Tu objetivo es recibir un título aburrido o mal redactado y devolver una versión mejorada, concisa y elegante. No añadas explicaciones, solo devuelve el nuevo título.",
        requestOptions: {
            timeout: 10, // 5 segundos de tiempo máximo de espera
        }
    });

    try {
        const prompt = `Embellece este título: "${nota.titulo}"`;
        const result = await model.generateContent(prompt);
        const tituloDecorado = result.response.text().trim();
        return { tituloOriginal: nota.titulo, tituloDecorado }
    } catch (e) {
        throw e
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const agregarImagen = async (img, idNota, idUsu) => {
    console.log(idNota, idUsu)
    const nota = await Nota.findOne({ _id: idNota, idUsuario: idUsu })
    if (!nota) {
        throw new NotaNoEncontradaError();
    }

    //subir la imagen a claudinary
    const imgBase64 = Buffer.from(img.buffer).toString("base64");
    //console.log(imgBase64)
    const uri = "data:" + img.mimetype + ";base64," + imgBase64;

    let result;
    try {
        result = await cloudinary.uploader.upload(uri)
        //console.log(resutlt)
    } catch (e) {
        console.log("error al subir la imagen", e)
        throw e
    }

    nota.imagenURL = result.secure_url
    return await nota.save()
}

//Metodo admin
const obtenerNotasUsuariosAdmin = async () => {
    const notasUsuarios = await Nota.find();
    return notasUsuarios;
}

export {
    obtenerNotasUsuario,
    obtenerNotaUsuarioPorId,
    modificarNotaUsuarioPorIdNota,
    eliminarNotaUsuarioPorId,
    crearNota,
    decorarTitulo,
    obtenerNotasUsuariosAdmin,
    agregarImagen
}