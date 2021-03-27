'use strict';

const {nanoid} = require('nanoid');
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findOne(id, offer) {
    return offer.comments.find((c) => c.id === id);
  }

  create(text) {
    return {id: nanoid(MAX_ID_LENGTH), text};
  }
}

module.exports = CommentService;
