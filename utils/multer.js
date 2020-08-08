const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log("file", file);
        callback(null, "");
    },
    filename: function(req, file, callback) {
        console.log("multer file:", file);
        callback(null, file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //reject file
        cb({ message: 'Unsupported file format' }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

module.exports = upload;