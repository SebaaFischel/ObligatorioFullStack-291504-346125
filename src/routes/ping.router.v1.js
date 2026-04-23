import express from "express";
import { pong } from "../controllers/ping.controller.js";

const pingRouter = express.Router();

pingRouter.get("/", pong);

export { pingRouter };