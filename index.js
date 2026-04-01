import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import authRouter from "./src/routes/auth.router.v1.js";

// Rutas
import pingRouter from "./src/routes/ping.router.v1.js";

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

// Rutas base
app.use("/api/v1/ping", pingRouter);
app.use("/api/v1/auth", authRouter);

// Endpoint raíz opcional
app.get("/", (req, res) => {
    res.json({ message: "Obligatorio 1 - API Running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto " + PORT);
});