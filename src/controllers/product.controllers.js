import {
  getProductsService,
  getProductById,
  createProductService,
  updateProductService,
  deleteProductById
} from '../services/product.service.js';

export const getProductsController = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === 'true' }] }
      : {};

    const sortOption = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

    const result = await getProductsService(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true
    });

    const buildLink = (page) => `/api/products?limit=${limit}&page=${page}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`;

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = await createProductService(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await updateProductService(req.params.pid, req.body);
    if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.pid);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


