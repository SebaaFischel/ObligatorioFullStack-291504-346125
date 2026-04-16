import { GoogleGenerativeAI } from "@google/generative-ai";
import { buscarNotaPorId, eliminarNotaPorId, guardarNota, modificarNotaPorId, notas } from "../../bd.js";
import { Nota } from "../modelos/nota.model.js";


const obtenerNotas = async (req, res) => {
    //req.body
    //req.params
    //req.headers
    //req.query

    const notas = await Nota.find({ idUsuario: req.idUsu })

    //let notasUsuario = notas.filter(nota => idUsuario === nota.idUsuario)
/* 
    if (req.query.prioridad) {
        //console.log(Boolean('false')==true) 
        res.status(200).json(notasUsuario.filter(nota => req.query.prioridad == nota.prioridad))
        return
        //console.log('true'==true)
    } */
    res.status(200).json(notas)
}

const obtenerNotaPorId = async (req, res) => {
    const idUsuario = req.idUsu;
    const id = req.params.id
    const notaEncontrada = await buscarNotaPorId(id);

    if (notaEncontrada && notaEncontrada.idUsuario.toString() === idUsuario) {
        res.status(200).json(notaEncontrada);
    } else {
        res.status(404).json({ message: "Nota no encontrada" });
    }

    //console.log("el id que pone el usuario es: ", id)
}

const crearNota = async (req, res) => {
    // const body = req.body;
    /*  
        const titulo = body.titulo;
        const texto = body.texto;
        const imagen = body.imagen;
        const favorito = body.favorito
        const prioridad = body.prioridad  
    */

    const nuevaNota = await guardarNota(req.body, req.idUsu) //me devuelve la NOTA CREADA
    //console.log("cosas mandadas por el usuario", titulo, texto, imagen, favorito, prioridad)

    res.status(201).json(nuevaNota);
}

const modificarNota = (req, res) => {
    const id = req.params.id

    const body = req.body

    const notaModificada = modificarNotaPorId(id, body)

    res.status(200).json(notaModificada);

    //console.log("el id que pone el usuario es: ", id)
}

const elminarNota = (req, res) => {
    const id = req.params.id

    eliminarNotaPorId(id);
    res.status(204).send();
    //console.log("el id que pone el usuario es: ", id)
}

const decorarTitulo = async (req, res) => {
    const id = req.params.id

    const nota = buscarNotaPorId(id);

    if (!nota) {
        res.status(404).json({ message: "nota no encontrada" })
        return
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
        res.status(200).json({ tituloOriginal: nota.titulo, tituloDecorado })
    } catch (e) {
        console.log("error con gemini", e)
        res.status(500).json({ message: "Error al decorar titulo con IA" })
    }

}

export {
    obtenerNotas,
    obtenerNotaPorId,
    crearNota,
    modificarNota,
    elminarNota,
    decorarTitulo
}