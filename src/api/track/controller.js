const { Op, Sequelize } = require('sequelize');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { models } = require('../../models');
const { NotFound, UnprocessableEntity } = require('../../utils/errors');

dayjs.extend(utc);

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
    // Request contains dates in format 'YYYY-MM-DD'
    let { startDate, endDate } = req.query;

    startDate = dayjs(new Date(startDate)).utc().format();
    endDate = dayjs(new Date(endDate)).utc().endOf('day').format();
    console.log(`FROM: ${startDate} TO: ${endDate}`);

    let tracking = await models.Track.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
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
    // Request contains dates in format 'YYYY-MM-DD'
    let { startDate, endDate } = req.query;

    startDate = dayjs(new Date(startDate)).utc().format();
    endDate = dayjs(new Date(endDate)).utc().endOf('day').format();
    console.log(`FROM: ${startDate} TO: ${endDate}`);

    let tracking = await models.Track.findAll({
      where: {
        [Op.and]: [
          {
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
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
    // Request body contains date in ISO format
    let habitId = req.body.habitId;
    let dateOnly = dayjs(req.body.date).utc().format('YYYY-MM-DD');
    console.log(dateOnly);

    // Check before adding if habit has already been tracked for this day.
    let check = await models.Track.findOne({
      where: {
        [Op.and]: [
          { habitId },
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('date')),
            dateOnly,
          ),
        ],
      },
    });

    if (check) {
      throw new UnprocessableEntity(
        'This habit has already been tracked for the day!',
      );
    }

    const track = await models.Track.create(req.body);
    console.log("Track's auto-generated ID:", track.id);

    res.json(req.body);
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
  getAllTrackForDates,
  getAllTracking,
  getSpecificTrackForDates,
};
