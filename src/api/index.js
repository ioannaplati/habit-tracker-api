const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler');
const checkAuthenticated = require('../middleware/auth');
const habitRouter = require('./habit');
const treatRouter = require('./treat');
const trackRouter = require('./track');
const authRouter = require('./auth');

const router = express.Router();

router.use(cors());

router.use('/v1/auth', authRouter);
router.use('/v1/habits', checkAuthenticated, habitRouter);
router.use('/v1/treats', checkAuthenticated, treatRouter);
router.use('/v1/track', checkAuthenticated, trackRouter);

router.use(errorHandler);

module.exports = router;
