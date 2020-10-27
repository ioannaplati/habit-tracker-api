const { models } = require('../../models');
const { NotFound } = require('../../utils/errors');

const getAllHabits = async (_, res, next) => {
  try {
    let habits = await models.Habit.findAll();
    res.json(habits);
  } catch (err) {
    next(err);
  }
};

const getHabitById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let habit = await models.Habit.findByPk(id);
    if (!habit) {
      throw new NotFound('Habit not found!');
    }
    res.json(habit);
  } catch (err) {
    next(err);
  }
};

const addHabit = async (req, res, next) => {
  try {
    const habit = await models.Habit.create(req.body);
    console.log("Habit's auto-generated ID:", habit.id);

    res.json({ new_habit: req.body });
  } catch (err) {
    next(err);
  }
};

// TODO
const editHabit = () => {};

const toggleHabitArchive = async (req, res, next) => {
  try {
    let id = req.params.id;
    let habit = await models.Habit.findByPk(id);

    if (!habit) {
      throw new NotFound('Habit was not found.');
    }

    await models.Habit.update({ archived: !habit.archived }, { where: { id } });
    res.send(`Habit with ID ${id} archived: ${!habit.archived}`);
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (_, res, next) => {
  try {
    await models.Habit.destroy({ where: {} });
    res.send('All habits deleted!');
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let habit = await models.Habit.findByPk(id);

    if (!habit) {
      throw new NotFound('Habit was not found!');
    }

    await models.Habit.destroy({ where: { id } });
    res.send(`Habit with ID ${id} has been deleted.`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addHabit,
  deleteAll,
  deleteById,
  editHabit,
  getAllHabits,
  getHabitById,
  toggleHabitArchive,
};
