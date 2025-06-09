import {
  getAllCartsService,
  createCartService,
  getCartByIdPopulated,
  addProductToCartService,
  deleteProductFromCartService,
  updateCartProductsService,
  updateProductQtyService,
  deleteAllCartProductsService
} from '../services/cart.service.js';

export const getCartsController = async (req, res) => {
  try {
    const carts = await getAllCartsService();
    res.json({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createCartController = async (req, res) => {
  try {
    const newCart = await createCartService();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartByIdController = async (req, res) => {
  try {
    const cart = await getCartByIdPopulated(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const updatedCart = await addProductToCartService(req.params.cid, req.params.pid);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  try {
    const updatedCart = await deleteProductFromCartService(req.params.cid, req.params.pid);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateCartProductsController = async (req, res) => {
  try {
    const updatedCart = await updateCartProductsService(req.params.cid, req.body.products);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateProductQtyController = async (req, res) => {
  try {
    const updatedCart = await updateProductQtyService(req.params.cid, req.params.pid, req.body.quantity);
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteAllCartProductsController = async (req, res) => {
  try {
    const updatedCart = await deleteAllCartProductsService(req.params.cid);
    res.json({ status: 'success', message: 'Todos los productos eliminados', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
