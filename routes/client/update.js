import { Router } from 'express';
import { update } from '../../controllers/client/updateController.js';
import * as authMiddleware from '../../middlewares/auth.js';

const router = Router();

router.put('/update/:id', authMiddleware.authMiddleware, update);

export default router;
