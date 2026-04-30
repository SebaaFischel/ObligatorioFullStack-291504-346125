import * as categoriasService from "../services/categorias.service.v1.js";

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await categoriasService.obtenerCategorias();
        res.status(200).json(categorias);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await categoriasService.crearCategoria(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const actualizarCategoria = async (req, res) => {
    try {
        const categoriaActualizada = await categoriasService.actualizarCategoria(req.params.id, req.body);
        res.status(200).json(categoriaActualizada);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const eliminarCategoria = async (req, res) => {
    try {
        await categoriasService.eliminarCategoria(req.params.id);
        res.status(200).json({ message: "Categoría eliminada con éxito" });
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

export {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
