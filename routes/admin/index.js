import { Router } from 'express';
import userRoutes from './userRoutes.js';
import productsRoutes from './products.js';
import ordersRoutes from './orders.js';

const router = Router();

router.use('/admin', userRoutes);
router.use('/api/product', productsRoutes);
router.use('/admin/orders/', ordersRoutes);

export default router;
