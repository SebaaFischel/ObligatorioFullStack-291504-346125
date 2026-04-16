import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true // No queremos categorías repetidas
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
        collection: "categorias"
    }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;