import { Router } from 'express';
import * as productController from '../../controllers/admin/productController.js';
import { isAdmin, authMiddleware } from '../../middlewares/auth.js';
import * as productModel from '../../models/product.js';

const router = Router();

router.post('/', authMiddleware, isAdmin, productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct);

export default router;
