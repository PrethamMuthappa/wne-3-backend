import { Router } from 'express';
import * as orderController from '../../controllers/admin/orderController.js';
import * as authMiddleware from '../../middlewares/auth.js';

const router = Router();

router.get('/', authMiddleware.cookieChecker,authMiddleware.isAdmin,orderController.getAllOrders);
router.put('/:order_id', authMiddleware.cookieChecker,authMiddleware.isAdmin,orderController.updateStatus);

export default router;
