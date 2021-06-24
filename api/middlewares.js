const { isValidObjectId } = require('mongoose');

module.exports = {
  verifyToken,
  tokenFailRes,
  isValidIdFormat,
};

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    next();
  }
}

function tokenFailRes(req, res, next) {
  if (!req.token) {
    return res.sendStatus(403);
  }
  next();
}

function isValidIdFormat(param) {
  return function (req, res, next) {
    if (!isValidObjectId(req.params[param])) {
      return res.json({
        error: {
          code: 400,
          message: 'Invalid id format',
        },
      });
    }

    next();
  };
}
