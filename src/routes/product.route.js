const router = require('express').Router();
const { productController } = require('../controllers');

router.get('/', productController.getAllProducts);
router.get('/search', productController.getProductByName);
router.get('/v1', productController.sortByProductNameAsc);
router.get('/v2', productController.sortByProductNameDesc);
router.get('/p1', productController.sortByPriceAsc);
router.get('/p2', productController.sortByPriceDesc);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.patch(
  '/:id',
  productController.editProductById,
  productController.getProductById
);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
