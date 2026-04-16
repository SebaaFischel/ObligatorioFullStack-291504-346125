import express from "express";
import { cambiarPlan } from "../controllers/users.controller.v1.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { esAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.put("/upgrade/:id", authMiddleware, esAdmin, cambiarPlan);

export default router;