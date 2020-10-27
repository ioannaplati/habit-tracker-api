const express = require('express');
const bodyParser = require('body-parser');
const validator = require('../../middleware/schemaValidator');
const schemas = require('../schemas');
const controller = require('./controller');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get(
  '/',
  jsonParser,
  validator(schemas.getTrackForDates, 'body'),
  controller.getAllTrackForDates,
);
router.get('/all', controller.getAllTracking);
router.get(
  '/:habitId',
  jsonParser,
  validator(schemas.getTrackForDates, 'body'),
  controller.getSpecificTrackForDates,
);

router.post(
  '/',
  jsonParser,
  validator(schemas.addTrack, 'body'),
  controller.addTrack,
);

// delete-all: for debugging purposes
router.delete('/all', controller.deleteAll);
router.delete('/:id', controller.deleteById);

module.exports = router;
