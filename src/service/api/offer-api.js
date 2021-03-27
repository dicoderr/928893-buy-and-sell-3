'use strict';

const {Router} = require(`express`);
const {
  offerValidator,
  offerExists,
  commentValidator,
} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, router);

  router.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });

  router.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);
    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found ${offerId}`);
    }
    return res.status(HttpCode.OK).json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);
    return res.status(HttpCode.CREATED).json(offer);
  });

  router.put(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const modifiedOffer = Object.keys(offer).reduce((acc, key) => {
      const value = req.body[key];
      if (value) acc[key] = value;
      return acc;
    }, offer);
    offerService.update(offer.id, modifiedOffer);
    return res.status(HttpCode.OK).send(`Successfully updated ${offer.id}`);
  });

  router.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const deletedOffer = offerService.delete(offer.id);
    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found ${offer.id}`);
    }
    return res
      .status(HttpCode.NO_CONTENT)
      .send(`Successfully deleted offer ${offer.id}`);
  });

  router.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    return res.status(HttpCode.OK).json(offer.comments);
  });

  router.post(
    `/:offerId/comments`,
    [offerExists(offerService), commentValidator],
    (req, res) => {
      const {offer} = res.locals;
      const newComment = commentService.create(req.body.text);
      const comments = offer.comments.concat(newComment);
      offerService.update(offer.id, {comments});
      return res
        .status(HttpCode.OK)
        .send(`Successfully added comment ${newComment.id}`);
    },
  );

  router.delete(
    `/:offerId/comments/:commentId`,
    offerExists(offerService),
    (req, res) => {
      const {offer} = res.locals;
      const {commentId} = req.params;
      const deletedComment = commentService.findOne(commentId, offer);
      if (!deletedComment) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found comment ${commentId}`);
      }
      offer.comments = offer.comments.filter(({id}) => id !== commentId);
      offerService.update(offer.id, offer);
      return res
        .status(HttpCode.OK)
        .send(`Successfully delete comment ${commentId}`);
    },
  );
};
