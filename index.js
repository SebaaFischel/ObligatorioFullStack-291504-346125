import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { conectarDB } from "./config/db_config.js";
import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import authRouter from "./src/routes/auth.router.v1.js";
import pingRouter from "./src/routes/ping.router.v1.js";
import categoryRouter from "./src/routes/categories.router.v1.js";
import usersRouter from "./src/routes/users.router.v1.js";
import userMoviesRouter from "./src/routes/user.movies.router.v1.js";
import tmdbRouter from "./src/routes/tmdb.router.v1.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

app.use("/api/v1/ping", pingRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/user-movies", userMoviesRouter);
app.use("/api/v1/tmdb", tmdbRouter);

app.get("/", (req, res) => {
    res.json({ message: "Obligatorio 1 - API Running" });
});

conectarDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto " + PORT);
});