import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    texto: { type: String, require: true },
    prioridad: { type: Number },
    idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, 
{
    timestamps: true, 
    collection: "notas"
})

const Nota = mongoose.model("Nota", notaSchema)

export { Nota } 