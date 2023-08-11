import { Router } from 'express';
import authRoutes from './auth.js';
import updateRoutes from './update.js';
import orderRoutes from './orders.js';
import cartRoutes from './cart.js';

const router = Router();

router.use('/client/auth', authRoutes);
router.use('/client', updateRoutes);
router.use('/client/order', orderRoutes);
router.use('/client/cart', cartRoutes);

export default router;
