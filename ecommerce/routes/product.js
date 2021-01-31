const express = require('express');
const router = express.Router();

const { create, productById, readProduct, deleteProduct,
    updateProduct, getAllProducts, productsRelated,
    getAllProductCategories, listBySearch, getProductPhoto, listSearch } = require('../controllers/product.js');

const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.get('/product/:productId', readProduct);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, deleteProduct);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct);
router.get('/products', getAllProducts);
router.get('/products/related/:productId', productsRelated);
router.get('/products/categories', getAllProductCategories);
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get('/product/photo/:productId', getProductPhoto)

router.param('productId', productById);
router.param('userId', userById);

module.exports = router;