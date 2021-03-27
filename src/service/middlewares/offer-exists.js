'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);
  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).send(`Offer not found ${offerId}`);
  }
  res.locals.offer = offer;
  return next();
};
