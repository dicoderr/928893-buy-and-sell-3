'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.reduce((acc, {category}) => {
      category.forEach(acc.add, acc);
      return acc;
    }, new Set());
    return [...categories];
  }
}

module.exports = CategoryService;
