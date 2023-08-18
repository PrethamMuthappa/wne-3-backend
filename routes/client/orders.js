import { Router } from 'express';
import * as orderController from '../../controllers/client/orderController.js';
import * as authMiddleware from '../../middlewares/auth.js';

const router = Router();

router.post('/new',authMiddleware.cookieChecker, orderController.newOrder);
router.delete('/cancel',authMiddleware.cookieChecker, orderController.cancelOrder);
router.get('/order_details',authMiddleware.cookieChecker, orderController.orderDetails);

export default router;
