require('dotenv').config();

const express = require('express');
const { db } = require('./models');
const api = require('./api');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(api);

// Set force: true to re-create all models
db.sync({})
  .then(async () =>
    app.listen(PORT, () => {
      const MODE = process.env.NODE_ENV;
      console.info(`Server is listening on port ${PORT} in ${MODE} mode!`);
    }),
  )
  .catch(() => {
    console.error('Unable to sync database. Server has not started!');
  });
