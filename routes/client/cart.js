import { Router } from 'express';
import * as cartController from '../../controllers/client/cartController.js';

const router = Router();

router.get('/', cartController.getAllCartProducts);
router.put('/:id', cartController.updateProductQuantity);
router.delete('/:id', cartController.deleteProduct);

export default router;
