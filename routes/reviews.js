const express = require('express');
const router = express.Router( {mergeParams: true }); // This will access the params.id if mergeParams set to true
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', 
  isLoggedIn, 
  validateReview, 
  catchAsync(reviews.createReview));

router.delete('/:reviewId', 
  isLoggedIn, 
  isReviewAuthor, 
  catchAsync(reviews.deleteReview));

module.exports = router;