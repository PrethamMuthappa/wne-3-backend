const router = require('express').Router();


router.use(require('./client/index'));
router.use(require('./admin/index'));


module.exports = router;