import mongoose from "mongoose";

const conectarDB = async () => {

    const nombreBase = process.env.MONGO_DB_NAME;
    const usuario = process.env.MONGO_DB_USER;
    const password = process.env.MONGO_DB_PASSWORD;

    try {
        await mongoose.connect(
            `mongodb+srv://${usuario}:${password}@obligatoriofs.izl2jv5.mongodb.net/${nombreBase}?appName=ObligatorioFS`
        );
        console.log("BD conectada");
} catch (e) {
    console.log("Error al conectar con MongoDB:", e.message);
    process.exit(1);
}
};

export { conectarDB };