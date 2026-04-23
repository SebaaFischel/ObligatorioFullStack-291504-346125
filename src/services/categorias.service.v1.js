import { Categoria } from "../modelos/categoria.model.js";
import { CategoriaNoEncontradaError } from "../errors/CategoriaNoEncontradaError.js";
import { CategoriaDuplicadaError } from "../errors/CategoriaDuplicadaError.js";

const obtenerCategorias = async () => {
    return await Categoria.find();
};

const crearCategoria = async (datos) => {
    try {
        return await Categoria.create(datos);
    } catch (error) {
        if (error.code === 11000) {
            throw new CategoriaDuplicadaError();
        }
        throw error;
    }
};

const actualizarCategoria = async (id, datos) => {
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, datos, { new: true });
        if (!categoriaActualizada) {
            throw new CategoriaNoEncontradaError();
        }
        return categoriaActualizada;
    } catch (error) {
        if (error.code === 11000) {
            throw new CategoriaDuplicadaError();
        }
        throw error;
    }
};

const eliminarCategoria = async (id) => {
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    if (!categoriaEliminada) {
        throw new CategoriaNoEncontradaError();
    }
    return categoriaEliminada;
};

export {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
