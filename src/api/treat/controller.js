const { models } = require('../../models');
const { NotFound } = require('../../utils/errors');

const getAllTreats = async (_, res, next) => {
  try {
    let treats = await models.Treat.findAll();
    res.json(treats);
  } catch (err) {
    next(err);
  }
};

const addTreat = async (req, res, next) => {
  try {
    const treat = await models.Treat.create(req.body);
    console.log("Treat's auto-generated ID:", treat.id);
    res.json({ new_treat: req.body });
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
  getAllTreats,
  toggleTreatArchive,
};
