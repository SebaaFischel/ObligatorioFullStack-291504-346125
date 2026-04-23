import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { conectarDB } from "./src/config/db_config.js";
import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { authMiddleware } from "./src/middlewares/auth.middleware.js";

import { pingRouter } from "./src/routes/ping.router.v1.js";
import { authRouter } from "./src/routes/auth.router.v1.js";
import { categoriasRouter } from "./src/routes/categorias.router.v1.js";
import { usuariosRouter } from "./src/routes/usuarios.router.v1.js";
import { peliculasRouter } from "./src/routes/peliculas.router.v1.js";
import { tmdbRouter } from "./src/routes/tmdb.router.v1.js";
import { iaRouter } from "./src/routes/ia.router.v1.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

// Rutas Públicas
app.use("/v1/ping", pingRouter);
app.use("/v1/auth", authRouter);

// Rutas Privadas
app.use(authMiddleware);
app.use("/v1/categories", categoriasRouter);
app.use("/v1/users", usuariosRouter);
app.use("/v1/user-movies", peliculasRouter);
app.use("/v1/tmdb", tmdbRouter);
app.use("/v1/ia", iaRouter);

app.get("/", (req, res) => {
    res.json({ message: "Obligatorio 1 - API Running" });
});

conectarDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto " + PORT);
});