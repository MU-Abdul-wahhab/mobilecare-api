const express = require('express');

const authController = require('../controller/authController');

const route = express.Router();

route.post('/signup' , authController.signUp);


module.exports = route;