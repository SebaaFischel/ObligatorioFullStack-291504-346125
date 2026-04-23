import mongoose from "mongoose";

const conectarDB = async () => {
    // Usamos el nombre de variable que pide el profesor en su guía
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    try {
        await mongoose.connect(connectionString);
        console.log("BD conectada");
    } catch (e) {
        console.log("Error al conectar con MongoDB:", e.message);
        process.exit(1);
    }
};

export { conectarDB };