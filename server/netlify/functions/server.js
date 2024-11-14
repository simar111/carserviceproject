const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../../db');
const userController = require('../../controller');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
db.connectToDB();

// Define routes
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.post('/contact', userController.Contact);
router.post('/booking', userController.createBooking);
router.post('/createcar', userController.createCarBrand);
router.get('/getcar', userController.getAllCarBrands);

app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);
