const { update } = require('../../controllers/client/updateController');
const authMiddleware = require('../../middlewares/auth');
const router = require('express').Router();

router.put('/update/:id',authMiddleware.authMiddleware,update)


module.exports = router