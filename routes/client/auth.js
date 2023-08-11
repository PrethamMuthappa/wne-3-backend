const router = require('express').Router();
const authController = require('../../controllers/client/authController');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/refresh',authController.handleRefreshToken);
router.get('/logout',authController.logout);


module.exports = router