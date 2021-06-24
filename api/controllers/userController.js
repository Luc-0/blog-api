const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.loginPost = function (req, res) {
  const formUser = {
    username: req.body.username,
    password: req.body.password,
  };

  User.find({ username: formUser.username, password: formUser.password }).exec(
    (err, user) => {
      if (err || user.length == 0) {
        return res.json({
          error: {
            message: 'Invalid credentials',
          },
        });
      }
      jwt.sign(
        { user },
        process.env.SECRET_JWT,
        { expiresIn: '8h' },
        (err, token) => {
          if (err) {
            return res.json({
              error: {
                message: 'Error getting token',
              },
            });
          }

          return res.json({
            token,
          });
        }
      );
    }
  );
};
