const express = require("express");
const promotionRouter = express.Router();
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find().then(promotion => res.status(200).json(promotion))
    .catch(err => next(err))
  })
  .post(authenticate.verifyUser,(req, res, next) => {
    Promotion.create(req.body).then(promotion => res.status(200).json(promotion))
    .catch(err => next(err))
  })
  .put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(authenticate.verifyUser,(req, res, next) => {
    Promotion.deleteMany()
    .then(promotions => res.status(200).json(promotions));
  });

  promotionRouter.route('/:promotionId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err))
  })
  .post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
  })
  .put(authenticate.verifyUser,(req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, req.body, {new: true})
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err))
  })
  .delete(authenticate.verifyUser,(req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err))
  });

module.exports = promotionRouter;
