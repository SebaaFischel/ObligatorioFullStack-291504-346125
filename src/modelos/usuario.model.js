import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        nombreUsuario: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        mail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        contrasena: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        plan: {
            type: String,
            enum: ["plus", "premium"],
            default: "plus"
        }
    },
    {
        timestamps: true,
        collection: "usuarios"
    }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export { Usuario };
