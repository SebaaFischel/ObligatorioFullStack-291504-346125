import express from "express";
import { addMovie, getMovies } from "../controllers/user.movies.controller.v1.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userMovieValidatorMiddleware } from "../middleware/userMovie.validator.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getMovies);
router.post("/", userMovieValidatorMiddleware, addMovie);

export default router;