'use strict';

const {HttpCode} = require(`../../constants`);

const requiredKeys = [
  `category`,
  `description`,
  `picture`,
  `title`,
  `type`,
  `sum`,
];

module.exports = (req, res, next) => {
  const newOfferKeys = Object.keys(req.body);
  const isValidOffer = requiredKeys.every((key) => newOfferKeys.includes(key));
  if (!isValidOffer) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }
  return next();
};
