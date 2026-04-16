import express from "express";
import { cambiarPlan } from "../controllers/users.controller.v1.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/upgrade/:id", authMiddleware, cambiarPlan);

export default router;