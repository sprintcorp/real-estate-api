const cloudinary = require("cloudinary");
const _ = require('underscore');

const Q = require("q");

function upload(file) {
    cloudinary.config({
        cloud_name: "sprintcorp",
        api_key: "771228328885469",
        api_secret: "P3B2MOR2eoXZNHIsfYfSV412Owc"

    });

    return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, { width: 250, height: 250 }, (err, res) => {
            if (err) {
                console.log('cloudinary err:', err);
                reject(err);
            } else {
                console.log('cloudinary res:', res);
                return resolve(res.url);
            }
        });
    });
};


module.exports.upload = upload;