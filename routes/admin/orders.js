const router = require('express').Router();
const orderController = require('../../controllers/admin/orderController');
const authMiddleware = require('../../middlewares/auth');

router.get('/',authMiddleware.authMiddleware,authMiddleware.isAdmin,orderController.getAllOrders);
router.put('/',authMiddleware.authMiddleware,authMiddleware.isAdmin,orderController.updateStatus);
router.put('/:order_id',authMiddleware.authMiddleware,authMiddleware.isAdmin,orderController.updateStatus);

module.exports = router;