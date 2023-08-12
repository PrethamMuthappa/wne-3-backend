import { Router } from 'express';
import * as cartController from '../../controllers/client/cartController.js';
import { authMiddleware } from '../../middlewares/auth.js';
import { handleRefreshToken } from '../../controllers/client/authController.js';


const router = Router();

router.get('/', cartController.getAllCartProducts);
router.post('/:id',cartController.addProduct);
router.put('/:id', cartController.updateProductQuantity);
router.delete('/:id', cartController.deleteProduct);

export default router;
