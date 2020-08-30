const express = require('express');
const {
    getRatings,
    addRating
} = require('../controller/rating');

const Rating = require('../model/Rating');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, authorize('user', 'admin'), addRating);
router.route('/:id').get(getRatings);
module.exports = router;