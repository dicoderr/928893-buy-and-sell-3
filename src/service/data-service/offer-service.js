'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class OffersService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((offer) => offer.id === id);
  }

  create(offer) {
    const newOffer = Object.assign(
      {id: nanoid(MAX_ID_LENGTH), comments: []},
      offer,
    );
    this._offers.push(newOffer);
    return newOffer;
  }

  update(id, offer) {
    const currentOffer = this._offers.find((item) => item.id === id);
    return Object.assign(currentOffer, offer);
  }

  delete(id) {
    const offer = this._offers.find((item) => item.id === id);
    if (!offer) {
      return null;
    }
    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }
}

module.exports = OffersService;
