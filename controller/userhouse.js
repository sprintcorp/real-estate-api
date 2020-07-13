const UserHouse = require('../model/UserHouse');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc  add house to users list
//@route POST /api/v1/user_house
//@accss Private
exports.createUserHouse = asyncHandler(async(req, res, next) => {
    req.body.user = req.user.id;
    check = await UserHouse.findOne({
        $and: [{
            user: req.user.id
        }, {
            house: req.body.house
        }]
    });
    if (check) {
        return next(new ErrorResponse(`User already has this house on list`, 400));
        // res.status(201).json({ success: true, data: "true" });
    } else {
        const data = await UserHouse.create(req.body);
        res.status(201).json({ success: true, data: data });
    }
})

//@desc Get Houses on users list
//@route GET /api/v1/user_house
//@accss Private
exports.getUserHouses = asyncHandler(async(req, res, next) => {
    const house = await UserHouse.find({ user: req.user.id }).populate('house');
    if (!house) {
        return next(
            new ErrorResponse(`No house on list for ${req.user.firstname}`, 404)
        );
    }
    res.status(200).json({ success: true, length: house.length, data: house });
})

//@desc Get Houses on users list
//@route DELETE /api/v1/user_house/:id
//@accss Private
exports.deleteUserHouses = asyncHandler(async(req, res, next) => {
    const house = await UserHouse.findById(req.params.id);
    if (!house) {
        return next(
            new ErrorResponse(`No house with id ${req.params.id}`, 404)
        );
    }
    // console.log(house.user.toString())
    if (house.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse(`User is not authoried to remove house from list`, 403)
        );
    }

    house.remove();
    res.status(200).json({ success: true, data: "House removed from list" });
})