import { getCartByIdPopulated } from '../services/cart.service.js';

export const renderCartView = async (req, res) => {
  const cart = await getCartByIdPopulated(req.params.cid);
  res.render('cart', { cart });
};
