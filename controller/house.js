const House = require("../model/House");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const _ = require("underscore");
const fs = require("fs");
// const upload = require('../utils/multer')
const cloudinary = require('../utils/upload')




//@desc  Create new house
//@route POST /api/v1/houses
//@accss Private
exports.createHouse = async(req, res, next) => {
    console.log(req.files);
    req.body.user = req.user.id;
    if (!req.files || _.isEmpty(req.files)) {
        return next(new ErrorResponse(`No file uploaded`, 400));
    }
    const files = req.files
    console.log(Array.isArray(files))
    try {
        let urls = [];
        let multiple = async(path) => await cloudinary.upload(path);
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

            req.body.image = urls;
            const house = await House.create(req.body);
            res.status(201).json({ success: true, data: house });

        }
        if (!urls) {
            return next(new ErrorResponse(`response not gotten from source`, 400));
        }
    } catch (e) {
        console.log("err :", e);
        return next(e);
    }
};