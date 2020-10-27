const { Op } = require('sequelize');
const { models } = require('../../models');
const { NotFound } = require('../../utils/errors');

const getAllTracking = async (_, res, next) => {
  try {
    let tracking = await models.Track.findAll({ order: [['date', 'DESC']] });
    res.json(tracking);
  } catch (err) {
    next(err);
  }
};

const getAllTrackForDates = async (req, res, next) => {
  try {
    let { startDate, endDate } = req.body;

    let tracking = await models.Track.findAll({
      where: {
        date: { [Op.between]: [new Date(startDate), new Date(endDate)] },
      },
      order: [['date', 'DESC']],
    });
    res.json(tracking);
  } catch (err) {
    next(err);
  }
};

const getSpecificTrackForDates = async (req, res, next) => {
  try {
    let id = req.params.habitId;
    let { startDate, endDate } = req.body;

    let tracking = await models.Track.findAll({
      where: {
        [Op.and]: [
          { date: { [Op.between]: [new Date(startDate), new Date(endDate)] } },
          { habitId: id },
        ],
      },
      order: [['date', 'DESC']],
    });
    res.json(tracking);
  } catch (err) {
    next(err);
  }
};

const addTrack = async (req, res, next) => {
  try {
    const track = await models.Track.create(req.body);
    console.log("Track's auto-generated ID:", track.id);

    res.json({ latest_track: req.body });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (_, res, next) => {
  try {
    await models.Track.destroy({ where: {} });
    res.send('All tracking has been deleted!');
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let track = await models.Track.findByPk(id);

    if (!track) {
      throw new NotFound('Track record was not found.');
    }

    await models.Track.destroy({ where: { id } });
    res.send(`Habit track with ID ${id} has been deleted.`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTrack,
  deleteAll,
  deleteById,
  getAllTracking,
  getAllTrackForDates,
  getSpecificTrackForDates,
};
