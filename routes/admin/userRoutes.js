const router = require('express').Router();
const userController = require('../../controllers/admin/userController');
const authMiddleware = require('../../middlewares/auth');


router.route('/user/list').get(authMiddleware.authMiddleware,authMiddleware.isAdmin,userController.getAllUser);
router.route('/user/:id').get(authMiddleware.authMiddleware,authMiddleware.isAdmin,userController.getUser);
router.route('/user/delete/:id').delete(userController.deleteUser);
router.route('/user/update/:id').put(authMiddleware.authMiddleware,authMiddleware.isAdmin,userController.updateUser);

module.exports = router;