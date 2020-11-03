const { models } = require('../../models');
const { NotFound } = require('../../utils/errors');

const getAllTreats = async (_, res, next) => {
  try {
    let treats = await models.Treat.findAll({ where: { archived: false } });
    res.json(treats);
  } catch (err) {
    next(err);
  }
};

const getArchivedTreats = async (req, res, next) => {
  try {
    let treats = await models.Treat.findAll({ where: { archived: true } });
    res.json(treats);
  } catch (err) {
    next(err);
  }
};

const addTreat = async (req, res, next) => {
  try {
    const treat = await models.Treat.create(req.body);
    console.log("Treat's auto-generated ID:", treat.id);
    res.json(req.body);
  } catch (err) {
    next(err);
  }
};

const editTreat = async (req, res, next) => {
  try {
    let id = req.params.id;
    let treat = await models.Treat.findByPk(id);

    if (!treat) {
      throw new NotFound('Requested treat was not found!');
    }

    await models.Treat.update(req.body, { where: { id } });
    res.send('Treat updated.');
  } catch (err) {
    next(err);
  }
};

const toggleTreatArchive = async (req, res, next) => {
  try {
    let id = req.params.id;
    let treat = await models.Treat.findByPk(id);

    if (!treat) {
      throw new NotFound('Requested treat was not found!');
    }

    await models.Treat.update({ archived: !treat.archived }, { where: { id } });
    res.send(`Treat with ID ${id} archived: ${!treat.archived}`);
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (_, res, next) => {
  try {
    await models.Treat.destroy({ where: {} });
    res.send('All treats deleted!');
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let treat = await models.Treat.findByPk(id);

    if (!treat) {
      throw new NotFound('Requested treat was not found!');
    }

    await models.Treat.destroy({ where: { id } });
    res.send(`Treat with ID ${id} has been deleted.`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTreat,
  deleteAll,
  deleteById,
  editTreat,
  getAllTreats,
  getArchivedTreats,
  toggleTreatArchive,
};
