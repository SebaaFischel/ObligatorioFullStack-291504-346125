
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { userMovieValidatorMiddleware, userMovieUpdateValidatorMiddleware } from "../middleware/userMovie.validator.middleware.js";
import { addMovie, deleteMovie, getMovies, updateMovie } from "../controllers/user.movies.controller.v1.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getMovies);
router.post("/", userMovieValidatorMiddleware, addMovie);
router.delete("/:tmdbId", deleteMovie);
router.put("/:tmdbId", userMovieUpdateValidatorMiddleware, updateMovie);

export default router;