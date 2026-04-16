//Almacenar las notas temporalmente mientras no tenemos persistencia

import { Nota } from "./src/modelos/nota.model.js";


//hack para generar ids auto inrementales
let id = 1;
let notas = [
    {
        id: id++,
        titulo: "Titulo 1",
        texto: "Esta es la primer nota",
        fechaCreacion: "2025-03-19",
        imagen: "https://algo.com/img.jpg",
        favorito: false,
        prioridad: 2,
        idUsuario: 1
    },
    {
        id: id++,
        titulo: "Otra nota",
        texto: "Desarrollo full stack",
        fechaCreacion: "2025-03-15",
        imagen: "https://algo.com/img-2fjddfhgdakfghaa.jpg",
        favorito: false,
        prioridad: 1,
        idUsuario: 1
    },
    {
        id: id++,
        titulo: "Ultima",
        texto: "La mejor materia del semestre",
        fechaCreacion: "2025-03-09",
        imagen: "https://algo.com/fs-the-best.jpg",
        favorito: true,
        prioridad: 1,
        idUsuario: 2
    }
];


//recibe directamente el body (req.body)
const guardarNota = async ({ titulo, texto, imagen, favorito, prioridad }, idUsu) => {
    //va a hacer el push
    const nuevaNota = {
        titulo,
        texto,
        imagen,
        favorito: favorito || false,
        prioridad,
        idUsuario: idUsu
    }
    //notas.push(nuevaNota);
    const notaGuardada = await Nota.create(nuevaNota)
    return notaGuardada;
}

// const buscarNotaPorId = id => notas.find(nota => nota.id == id)
const buscarNotaPorId = async id => {
    //return notas.find(nota => nota.id == id)
    //Nota.findOne({ id: id })
    const nota = await Nota.findById(id)
    console.log(nota)
    return nota
}

const modificarNotaPorId = (id, body) => {
    let nota = buscarNotaPorId(id);

    if (nota) {
       Object.assign(nota, body)
    }

    return nota;
}


   /*  let nuevoArray = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        if (nota != id) { 
            nuevoArray.push(nota);
        }   
    }

    notas = nuevoArray; */
const eliminarNotaPorId = id => {
    notas = notas.filter(nota => nota.id != id);
}

export { notas, guardarNota, buscarNotaPorId, eliminarNotaPorId, modificarNotaPorId }

//export default notas