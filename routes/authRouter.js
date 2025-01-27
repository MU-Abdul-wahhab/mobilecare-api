const express = require('express');

const authController = require('../controller/authController');
const authValidator = require('../validators/authValidator');

const globalMiddleware = require('../middleware/globalMiddleware');

const route = express.Router();

route.post('/signup' , authValidator.checkUserExists , authValidator.signUp, globalMiddleware.checkError ,authController.signUp);


module.exports = route;