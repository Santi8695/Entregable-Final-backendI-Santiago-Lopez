import Product from '../models/product.model.js';

export const getProductsService = async (filter, options) => {
  return await Product.paginate(filter, options);
};

export const getProductById = async (pid) => {
  return await Product.findById(pid);
};

export const createProductService = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

export const updateProductService = async (pid, updateData) => {
  return await Product.findByIdAndUpdate(pid, updateData, { new: true });
};

export const deleteProductById = async (pid) => {
  return await Product.findByIdAndDelete(pid);
};
