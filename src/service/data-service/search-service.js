'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  byTitle(text) {
    if (!text) {
      return this._offers;
    }
    return this._offers.filter(({title}) => title.includes(text));
  }
}

module.exports = SearchService;
