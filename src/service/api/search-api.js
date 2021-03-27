'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query} = req.query;
    const filteredOffers = searchService.byTitle(query);
    res.status(HttpCode.OK).json(filteredOffers);
  });
};
