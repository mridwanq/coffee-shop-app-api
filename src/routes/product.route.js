const router = require('express').Router();
const { productController } = require('../controllers');
const { productMulter } = require('../middlewares/multers');
const { productValidator } = require('../middlewares/validators');

// get all products
router.get('/', productController.getAllProducts);

// get product by name
router.get('/search', productController.getProductByName);

// get product name by ascending
router.get('/v1', productController.sortByProductNameAsc);

// get product name by descending
router.get('/v2', productController.sortByProductNameDesc);

// get price by ascending
router.get('/p1', productController.sortByPriceAsc);

// get price by descending
router.get('/p2', productController.sortByPriceDesc);

// get product by id
router.get(
  '/:id',
  productValidator.getProductById,
  productController.getProductById
);

// post new product
router.post(
  '/',
  productMulter.productImageUploader().single('productImage'),
  productValidator.createProduct,
  productController.createProduct
);

// edit product by id
router.patch(
  '/:id',
  productValidator.editProduct,
  productController.editProductById,
  productController.getProductById
);

//delete product by id
router.delete(
  '/:id',
  productValidator.deleteProductById,
  productController.deleteProductById
);

module.exports = router;
