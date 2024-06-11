const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const authMiddleware = require('../config/authMiddleware');

route.post('/user', userController.postSignUp);
route.get('/users', userController.getUsers);
route.post('/login', userController.postSignIn);
route.post('/list', authMiddleware, listController.postList);
route.get('/list/:userId', authMiddleware, listController.getListsByUser);
route.delete('/list/:listId', authMiddleware, listController.deleteList);

module.exports = route;
