import { Router } from 'express';

const router = Router();

router.use('/admin', require('./userRoutes'));
router.use('/api/product', require('./products'));
router.use('/admin/orders/', require('./orders'));

export default router;
