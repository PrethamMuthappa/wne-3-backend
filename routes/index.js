import { Router } from 'express';

const router = Router();

router.use(require('./client/index'));
router.use(require('./admin/index'));

export default router;
