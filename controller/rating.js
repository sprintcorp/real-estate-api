const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rating = require('../model/Rating');
const User = require('../model/User');

// @desc      Get rating
// @route     GET /api/v1/ratings/:id
// @access    Public
exports.getRatings = asyncHandler(async(req, res, next) => {
    // if (req.params.bootcampId) {
    const rating = await Rating.find({ agent: req.params.id }).select('rating');

    return res.status(200).json({
        success: true,
        count: rating.length,
        data: rating
    });
    // } else {
    //     res.status(200).json(res.advancedResults);
    // }
});



// @desc      Add ratings
// @route     POST /api/v1/ratings
// @access    Private
exports.addRating = asyncHandler(async(req, res, next) => {
    req.body.user = req.user.id;

    const user = await User.findById(req.body.agent);

    if (!user) {
        return next(
            new ErrorResponse(
                `No user with the id of ${req.body.agent}`,
                404
            )
        );
    }

    const rating = await Rating.create(req.body);

    res.status(201).json({
        success: true,
        data: rating
    });
});