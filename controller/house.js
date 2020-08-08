const House = require("../model/House");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const utils = require("../utils/helper");
const _ = require("underscore");
const fs = require("fs");
const cloudinary = require('../utils/upload')
const geocoder = require('../utils/geocoder');
const { findByIdAndDelete } = require("../model/House");
// const url = require('url');


//@desc Get all Houses
//@route GET /api/v1/houses
//@accss Public
exports.getHouses = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc Get single Houses
//@route GET /api/v1/houses/:id
//@accss Public
exports.getHouse = asyncHandler(async(req, res, next) => {
    const house = await House.findById(req.params.id).populate('user');
    res.status(200).json({ success: true, data: house });
});

//@desc Get Houses by slug
//@route GET /api/v1/houses/_/:slug
//@accss Public
exports.getHouseBySlug = asyncHandler(async(req, res, next) => {
    const house = await House.find({
        slug: req.params.slug
    }).populate('user');
    res.status(200).json({ success: true, data: house });
});

//@desc Get Houses by users('agent')
//@route GET /api/v1/houses/_/user
//@accss Private
exports.getHouseByAgent = asyncHandler(async(req, res, next) => {
    const house = await House.find({
        user: req.user.id
    });
    res.status(200).json({ success: true, data: house });
});

//@desc Get Houses by value
//@route GET /api/v1/houses/_/requirement
//@accss Private
exports.getHouseByRequirement = asyncHandler(async(req, res, next) => {
    console.log(req.query)
    const house = await House.find({
        $and: [{
            "price": { "$gte": req.query.min, "$lte": req.query.max },
            "city": { "$in": req.query.city }
        }]

    });
    res.status(200).json({ success: true, length: house.length, data: house });
});

//@desc Get Random Houses
//@route GET /api/v1/houses/_/random
//@accss Private
exports.getHouseByRandom = asyncHandler(async(req, res, next) => {
    // console.log(req.query.rand)
    // const no = typeof parseInt(req.query.rand);
    const house = await House.aggregate([{ $sample: { size: 2 } }]);
    res.status(200).json({ success: true, length: house.length, data: house });
});


//@desc Get Houses by search
//@route GET /api/v1/houses/area/search
//@accss Public
exports.getHousesBySearch = asyncHandler(async(req, res, next) => {
    const def = new utils(req.query.name)
    const houses = await House.find({
        $or: [{
                administrativeLevels: def.Case
            }, { neighborhood: def.Case },
            { city: def.Case },
            { street: def.Case }
        ]
    });

    res.status(200).json({ success: true, length: houses.length, data: houses });
});

exports.testAddress = asyncHandler(async(req, res, next) => {
    const data = await geocoder.geocode(req.body.address);
    res.status(200).json({ data: data });
})




//@desc  Create new house
//@route POST /api/v1/houses
//@accss Private
exports.createHouse = asyncHandler(async(req, res, next) => {
    // console.log(req.files);
    req.body.user = req.user.id;

    // req.body.features = req.body.features.split(',');
    if (!req.files || _.isEmpty(req.files)) {
        return next(new ErrorResponse(`No file uploaded`, 400));
    }
    const files = req.files
    try {
        let urls = [];
        let multiple = async(path) => await new cloudinary(path).upload();
        console.log(files);
        for (const file of files) {
            const { path } = file;
            console.log("path", file);

            const newPath = await multiple(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        // console.log(urls);
        if (urls) {
            console.log(req.user)
            req.body.image = urls;
            const house = await House.create(req.body);
            res.status(201).json({ success: true, data: house });

        }
        if (!urls) {
            return next(new ErrorResponse(`response not gotten from source`, 400));
        }
    } catch (e) {
        console.log("err :", e);
        return next(new ErrorResonse(e, 400));
    }
});

exports.deleteHouse = asyncHandler(async(req, res, next) => {
    const checkIfHouseExist = await House.findById(req.params.id);
    if (!checkIfHouseExist) {
        return next(
            new ErrorResponse(`House not found with id of ${req.params.id}`, 404)
        );
    }
    const house = await House.findByIdAndDelete(req.params.id)
    if (house) {
        res.status(200).json({ success: true, data: "house Successfully deleted" });
    }
});