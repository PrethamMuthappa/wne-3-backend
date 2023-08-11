const router = require('express').Router();
const productController = require('../../controllers/admin/productController');
const { isAdmin, authMiddleware } = require('../../middlewares/auth');
const product = require('../../models/product');

router.post('/',authMiddleware,isAdmin,productController.addProduct);
router.get('/',productController.getAllProducts);
router.get('/search',productController.searchProduct);
router.get('/:id',productController.getProduct);
router.put('/:id',authMiddleware,isAdmin,productController.updateProduct);
router.delete('/:id',authMiddleware,isAdmin,productController.deleteProduct);


module.exports = router;