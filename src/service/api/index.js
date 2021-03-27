'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const {
  OfferService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);
const searchApi = require(`./search-api`);
const categoryApi = require(`./category-api`);
const offerApi = require(`./offer-api`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  searchApi(app, new SearchService(mockData));
  categoryApi(app, new CategoryService(mockData));
  offerApi(app, new OfferService(mockData), new CommentService());
})();

module.exports = app;
