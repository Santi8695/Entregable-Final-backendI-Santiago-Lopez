import Cart from '../models/cart.model.js';

export const getAllCartsService = async () => {
  return await Cart.find();
};

export const createCartService = async () => {
  const newCart = new Cart({ products: [] });
  return await newCart.save();
};

export const getCartByIdPopulated = async (cid) => {
  return await Cart.findById(cid).populate('products.product');
};

export const addProductToCartService = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  const existingProduct = cart.products.find(p => p.product.toString() === pid);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  return await cart.save();
};

export const deleteProductFromCartService = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  cart.products = cart.products.filter(p => p.product.toString() !== pid);
  return await cart.save();
};

export const updateCartProductsService = async (cid, products) => {
  const cart = await Cart.findById(cid);
  cart.products = products;
  return await cart.save();
};

export const updateProductQtyService = async (cid, pid, quantity) => {
  const cart = await Cart.findById(cid);
  const product = cart.products.find(p => p.product.toString() === pid);
  if (product) product.quantity = quantity;
  return await cart.save();
};

export const deleteAllCartProductsService = async (cid) => {
  const cart = await Cart.findById(cid);
  cart.products = [];
  return await cart.save();
};