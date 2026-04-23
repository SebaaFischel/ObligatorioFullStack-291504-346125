import express from "express"
import { ping } from "../controllers/ping.controller.js";

const pingRouter = express.Router();

pingRouter.get('/ping', ping)
pingRouter.get('/', ping)

export { pingRouter }