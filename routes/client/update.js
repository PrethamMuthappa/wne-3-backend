import { Router } from 'express';
import { update } from '../../controllers/client/updateController';
import * as authMiddleware from '../../middlewares/auth';

const router = Router();

router.put('/update/:id', authMiddleware.authMiddleware, update);

export default router;
