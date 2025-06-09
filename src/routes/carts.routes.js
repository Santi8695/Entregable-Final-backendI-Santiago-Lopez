import { Router } from 'express';
import {
  getCartsController,
  createCartController,
  getCartByIdController,
  addProductToCartController,
  deleteProductFromCartController,
  updateCartProductsController,
  updateProductQtyController,
  deleteAllCartProductsController
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCartsController);
router.post('/', createCartController);
router.get('/:cid', getCartByIdController);
router.post('/:cid/products/:pid', addProductToCartController);
router.delete('/:cid/products/:pid', deleteProductFromCartController);
router.put('/:cid', updateCartProductsController);
router.put('/:cid/products/:pid', updateProductQtyController);
router.delete('/:cid', deleteAllCartProductsController);

export default router;
