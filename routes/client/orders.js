import { Router } from 'express';
import * as orderController from '../../controllers/client/orderController';
import * as authMiddleware from '../../middlewares/auth';

const router = Router();

router.get('/new', authMiddleware.authMiddleware, orderController.newOrder);
router.get('/cancel', orderController.cancelOrder);
router.get('/order_details', authMiddleware.authMiddleware, orderController.orderDetails);

export default router;
