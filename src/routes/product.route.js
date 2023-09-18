const router = require('express').Router();
const { productController } = require('../controllers');
const { productMulter } = require('../middlewares/multers');
const { productValidator } = require('../middlewares/validators');

// get all products
router.get('/', productController.getAllProducts);

// get product by name
router.get('/search', productController.getProductByName);

// sort by product name
router.get('/p1', productController.sortByProductName);

// sort by price
router.get('/p2', productController.sortByPrice);

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
  productMulter.productImageUploader().single('productImage'),
  productValidator.editProduct,
  productController.editProductById
);

//delete product by id
router.delete(
  '/:id',
  productValidator.deleteProductById,
  productController.deleteProductById
);

module.exports = router;
