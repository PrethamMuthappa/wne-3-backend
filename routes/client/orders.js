import { Router } from 'express';
import * as orderController from '../../controllers/client/orderController.js';
import * as authMiddleware from '../../middlewares/auth.js';

const router = Router();

router.post('/new', orderController.newOrder);
router.delete('/cancel', orderController.cancelOrder);
router.get('/order_details', orderController.orderDetails);

export default router;
