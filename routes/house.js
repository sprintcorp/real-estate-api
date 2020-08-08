const upload = require("../utils/multer");
const express = require("express");
const url = require('url');
const querystring = require('querystring');
const { createHouse, getHouses, getHouse, getHouseBySlug, getHousesBySearch, getHouseByAgent, getHouseByRequirement, testAddress, deleteHouse } = require("../controller/house");

const House = require("../model/House");
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { route } = require("./category");
const advancedResults = require("../middleware/advancedResults");



// let storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         console.log("file", file);
//         callback(null, "./Uploads/");
//     },
//     filename: function(req, file, callback) {
//         console.log("multer file:", file);
//         callback(null, file.originalname);
//     }
// });
// let maxSize = 1000000 * 1000;
// let upload = multer({
//     storage: storage
// });

//Route links
router.post('/', protect, upload.array("image"), authorize('admin', 'agent'), createHouse);
router.route('/').get(advancedResults(House, {
    path: "user",
    select: "firstname lastname email",
}), getHouses).put(testAddress);
router.route('/:id').get(getHouse).delete(protect, authorize('admin', 'agent'), deleteHouse);
router.get('/area/search', getHousesBySearch);
router.get('/_/user', protect, authorize('agent'), getHouseByAgent);
router.get('/_/requirement', getHouseByRequirement)
router.route('/_/:slug').get(getHouseBySlug);
// router.get('/radius/:zipcode/:distance', getHouseByRadius)

module.exports = router;