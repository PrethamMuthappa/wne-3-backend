import { Router } from 'express';
import clientRoutes from './client/index.js';
import adminRoutes from './admin/index.js';

const router = Router();

router.use(clientRoutes);
router.use(adminRoutes);

export default router;
