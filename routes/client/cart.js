const router = require('express').Router();
const cartController = require('../../controllers/client/cartController');

router.get('/',cartController.getAllCartProducts);
router.put('/:id',cartController.updateProductQuantity);
router.delete('/:id',cartController.deleteProduct);


module.exports = router;