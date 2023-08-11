import { Router } from 'express';
import * as orderController from '../../controllers/admin/orderController';
import * as authMiddleware from '../../middlewares/auth';

const router = Router();

router.get('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, orderController.getAllOrders);
router.put('/', authMiddleware.authMiddleware, authMiddleware.isAdmin, orderController.updateStatus);
router.put('/:order_id', authMiddleware.authMiddleware, authMiddleware.isAdmin, orderController.updateStatus);

export default router;
