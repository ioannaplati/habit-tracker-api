const Joi = require('joi');

const createHabit = Joi.object().keys({
  name: Joi.string().min(1).max(40).required(),
  points: Joi.number().positive().max(10).required(),
  occurrence: Joi.number().integer().positive().max(7).required(),
});

const editHabit = Joi.object().keys({
  name: Joi.string().min(1).max(40),
  points: Joi.number().positive().max(10),
  occurrence: Joi.number().integer().positive().max(7),
  archived: Joi.boolean(),
});

const createTreat = Joi.object().keys({
  name: Joi.string().min(1).max(40).required(),
  points: Joi.number().positive().required(),
});

const editTreat = Joi.object().keys({
  name: Joi.string().min(1).max(40),
  points: Joi.number().positive(),
  archived: Joi.boolean(),
});

const addTrack = Joi.object().keys({
  habitId: Joi.number().integer().positive().required(),
  date: Joi.date().iso().max('now').required(),
});

const getTrackForDates = Joi.object().keys({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).max('now').required(),
});

module.exports = {
  addTrack,
  createHabit,
  createTreat,
  editHabit,
  editTreat,
  getTrackForDates,
};
