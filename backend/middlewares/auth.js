const jwt = require('jsonwebtoken');
const InvalidAuth = require('../errors/invalid-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidAuth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payloud;

  try {
    payloud = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
  } catch (err) {
    return next(new InvalidAuth('Необходима авторизация'));
  }

  req.user = payloud;
  next();
};
