const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');

route.post('/user', userController.postSignUp);
route.get('/users', userController.getUsers);
route.post('/login', userController.postSignIn);
route.post('/list', listController.postList);
route.get('/list/:userId', listController.getListsbyUser);
route.delete('/list/:listId', listController.deleteList);

module.exports = route;