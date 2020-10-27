const express = require('express');
const bodyParser = require('body-parser');
const validator = require('../../middleware/schemaValidator');
const controller = require('./controller');
const schemas = require('../schemas');

const router = express.Router();

//Create application/json parser
const jsonParser = bodyParser.json();

router.get('/', controller.getAllHabits);
router.get('/:id', controller.getHabitById);

router.post(
  '/',
  jsonParser,
  validator(schemas.createHabit, 'body'),
  controller.addHabit,
);

// router.patch('/:id', jsonParser, controller.editHabit);
router.patch('/archive/:id', controller.toggleHabitArchive);

// delete-all: for debugging purposes
router.delete('/all', controller.deleteAll);
router.delete('/:id', controller.deleteById);

module.exports = router;
