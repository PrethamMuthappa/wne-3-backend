const router = require('express').Router();


router.use('/client/auth',require('./auth'));
router.use('/client',require('./update'));
router.use('/client/order',require('./orders'));
router.use('/client/cart',require('./cart'));



module.exports = router;