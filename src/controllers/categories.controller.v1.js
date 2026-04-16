import * as categoryService from "../services/categories.service.v1.js";
export const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
export const postCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
export const putCategory = async (req, res) => {
    try {
        const updated = await categoryService.updateCategory(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "No se encontró la categoría" });
        res.status(200).json(updated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No se encontró la categoría" });
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};