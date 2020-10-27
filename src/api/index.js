const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const habitRouter = require('./habit');
const treatRouter = require('./treat');
const trackRouter = require('./track');

const router = express.Router();

router.use('/v1/habits', habitRouter);
router.use('/v1/treats', treatRouter);
router.use('/v1/track', trackRouter);

router.use(errorHandler);

module.exports = router;
