import { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProductsController);
router.get('/:pid', getProductByIdController);
router.post('/', createProductController);
router.put('/:pid', updateProductController);
router.delete('/:pid', deleteProductController);

export default router;