require('dotenv').config();

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async token => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const {
    email,
    given_name: firstName,
    family_name: lastName,
  } = ticket.getPayload();
  return { email, firstName, lastName };
};

const getNewToken = id => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });
};

module.exports = { verifyGoogleToken, getNewToken };
