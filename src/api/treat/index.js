const express = require('express');
const bodyParser = require('body-parser');
const validator = require('../../middleware/schemaValidator');
const schemas = require('../schemas');
const controller = require('./controller');

const jsonParser = bodyParser.json();

const router = express.Router();

router.get('/', controller.getAllTreats);

router.post(
  '/',
  jsonParser,
  validator(schemas.createTreat, 'body'),
  controller.addTreat,
);

router.patch('/archive/:id', controller.toggleTreatArchive);

// delete-all: for debugging purposes
router.delete('/all', controller.deleteAll);
router.delete('/:id', controller.deleteById);

module.exports = router;
