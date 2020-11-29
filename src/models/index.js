require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const modelDefiners = [
  require('./user'),
  require('./habit'),
  require('./treat'),
  require('./track'),
];

// Create new database connection
const db = new Sequelize(process.env.POSTGRES_URI);

// Test connection
db.authenticate()
  .then(() => {
    console.info('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define models
for (const modelDefiner of modelDefiners) {
  modelDefiner(db, DataTypes);
}

const models = db.models;

// Model associations
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = { db, models };
