const { models } = require('../../models');
const { NotFound } = require('../../utils/errors');

const getHabits = async (_, res, next) => {
  try {
    let habits = await models.Habit.findAll({ where: { archived: false } });
    res.json(habits);
  } catch (err) {
    next(err);
  }
};

const getArchivedHabits = async (_, res, next) => {
  try {
    let archived = await models.Habit.findAll({ where: { archived: true } });
    res.json(archived);
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

const editHabit = async (req, res, next) => {
  try {
    let id = req.params.id;
    let habit = await models.Habit.findByPk(id);
    if (!habit) {
      throw new NotFound('Habit was not found.');
    }

    await models.Habit.update(req.body, { where: { id } });
    res.send('Habit updated.');
  } catch (err) {
    next(err);
  }
};

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
  getArchivedHabits,
  getHabitById,
  getHabits,
  toggleHabitArchive,
};
