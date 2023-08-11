const router = require('express').Router();
const orderController = require('../../controllers/client/orderController');
const authMiddleware = require('../../middlewares/auth');


router.get('/new',authMiddleware.authMiddleware,orderController.newOrder);
router.get('/cancel',orderController.cancelOrder);
router.get('/order_details',authMiddleware.authMiddleware,orderController.orderDetails)


module.exports = router;


