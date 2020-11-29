const { models } = require('../../models');
const { BadRequest } = require('../../utils/errors');
const { verifyGoogleToken, getNewToken } = require('../../utils/auth');

const signIn = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new BadRequest('Missing token!');
    }

    let user = await verifyGoogleToken(token);
    if (!user.email) {
      throw new Error('Verification of Google token failed.');
    }

    const userInDb = await models.User.findOne({
      where: { email: user.email },
    });

    let newUser = {};
    if (!userInDb) {
      newUser = await models.User.create({ ...user, spendingPoints: 0 });
    }

    const userId = userInDb ? userInDb.id : newUser.id;
    const accessToken = getNewToken(userId);

    res.json({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn };
