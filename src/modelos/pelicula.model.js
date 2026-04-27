import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema(
    {
        idUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        tmdbId: {
            type: Number,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        rutaPoster: {
            type: String
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
            default: 5
        },
        reseña: {
            type: String,
            trim: true
        },
        idCategoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categoria",
            required: true
        },
        imagenURL: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: "peliculas_usuarios"
    }
);

peliculaSchema.index({ idUsuario: 1, tmdbId: 1 }, { unique: true });

const Pelicula = mongoose.model("Pelicula", peliculaSchema);

export { Pelicula };
