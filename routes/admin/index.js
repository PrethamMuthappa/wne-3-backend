const router = require('express').Router();


router.use('/admin',require('./userRoutes'));
router.use('/api/product',require('./products'));
router.use('/admin/orders/',require('./orders'));




module.exports = router;