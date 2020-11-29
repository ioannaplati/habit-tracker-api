require('dotenv').config();

const jwt = require('jsonwebtoken');
const { UnauthorizedUser } = require('../utils/errors');

function checkAuthenticated(req, _, next) {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    throw new UnauthorizedUser('User needs to be logged in!');
  }

  const token = bearer.split('Bearer ')[1].trim();
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    { algorithm: 'HS256' },
    (err, user) => {
      console.log(err);
      if (err) {
        throw new UnauthorizedUser('User needs to be logged in!');
      }
      req.user = user;
      next();
    },
  );
}

module.exports = checkAuthenticated;
