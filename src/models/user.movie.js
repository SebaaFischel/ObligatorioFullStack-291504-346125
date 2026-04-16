import mongoose from "mongoose";

const userMovieSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tmdbId: {
            type: Number,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        rutaPoster: {
            type: String
        },
        rating: {
            type: Number,
            min: 1,
            max: 10,
            default: 5
        },
        review: {
            type: String,
            trim: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "peliculas_usuarios"
    }
);

userMovieSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const UserMovie = mongoose.model("UserMovie", userMovieSchema);

export default UserMovie;