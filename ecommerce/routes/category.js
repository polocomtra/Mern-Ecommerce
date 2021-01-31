const express = require('express');
const router = express.Router();

const { create, categoryById, readCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/category');
const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.get('/category/:categoryId', readCategory);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory);
router.delete('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, deleteCategory);
router.get('/categories', getAllCategories);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;