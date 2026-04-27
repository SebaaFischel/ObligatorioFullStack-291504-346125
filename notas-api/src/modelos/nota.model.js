import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
    prioridad: { type: Number },
    idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    imagenURL: { type: String }
}, 
{
    timestamps: true, 
    collection: "notas"
})

const Nota = mongoose.model("Nota", notaSchema)

export { Nota } 