'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (req, res, next) => {
  if (!req.body.text) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }
  return next();
};
