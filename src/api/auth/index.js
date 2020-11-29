const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/signin', jsonParser, controller.signIn);

module.exports = router;
