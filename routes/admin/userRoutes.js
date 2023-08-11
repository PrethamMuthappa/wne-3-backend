import { Router } from 'express';
import * as userController from '../../controllers/admin/userController';
import * as authMiddleware from '../../middlewares/auth';

const router = Router();

router.route('/user/list').get(authMiddleware.authMiddleware, authMiddleware.isAdmin, userController.getAllUser);
router.route('/user/:id').get(authMiddleware.authMiddleware, authMiddleware.isAdmin, userController.getUser);
router.route('/user/delete/:id').delete(userController.deleteUser);
router.route('/user/update/:id').put(authMiddleware.authMiddleware, authMiddleware.isAdmin, userController.updateUser);

export default router;
