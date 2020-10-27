const Joi = require('@hapi/joi');

const createHabit = Joi.object().keys({
  name: Joi.string().min(1).max(40),
  points: Joi.number().min(1).max(10),
  occurrence: Joi.number().integer().positive().max(7),
});

const createTreat = Joi.object().keys({
  name: Joi.string().min(1).max(40),
  points: Joi.number().positive(),
});

const addTrack = Joi.object().keys({
  habitId: Joi.number().integer().positive(),
  date: Joi.date().iso().max('now'),
});

const getTrackForDates = Joi.object().keys({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).max('now').required(),
});

module.exports = { createHabit, createTreat, addTrack, getTrackForDates };
