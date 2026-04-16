import Category from "../models/category.js";

export const getAllCategories = async () => {
    return await Category.find();
};

export const createCategory = async (data) => {
    return await Category.create(data);
};

export const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};
