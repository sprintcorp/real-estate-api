const upload = require("../utils/multer");
const { createHouse } = require("../controller/house");
const express = require("express");

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');



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
router.post('/', protect, upload.array("image"), createHouse);


module.exports = router;