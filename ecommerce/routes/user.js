const express = require('express');
const router = express.Router();

const { userById, getUser, updateUser } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');


router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);
router.param('userId', userById);

module.exports = router;