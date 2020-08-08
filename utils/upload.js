const cloudinary = require("cloudinary");
// const _ = require('underscore');

// const Q = require("q");

// function upload(file) {
//     cloudinary.config({
//         cloud_name: "sprintcorp",
//         api_key: "771228328885469",
//         api_secret: "P3B2MOR2eoXZNHIsfYfSV412Owc"

//     });

//     return new Q.Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload(file, { width: 250, height: 250 }, (err, res) => {
//             if (err) {
//                 console.log('cloudinary err:', err);
//                 reject(err);
//             } else {
//                 console.log('cloudinary res:', res);
//                 return resolve(res.url);
//             }
//         });
//     });
// };


// module.exports.upload = upload;const cloudinary = require("cloudinary");

// if (req.file) {
//     console.log("true")
//     const files = req.file;
//     try {
//         let multiple = async(path) => await cloudinary.upload(path);
//         const { path } = files;
//         console.log("path", files);
//         const newPath = await multiple(path);
//         fs.unlinkSync(path);
//         req.body.image = newPath;
//     } catch (e) {
//         console.log("err :", e);
//         return next(new ErrorResonse(e, 400));
//     }
// }
// // console.log("true")
// const fieldsToUpdate = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     phone: req.body.phone,
//     address: req.body.address,
//     email: req.body.email,
//     image: req.body.image
// };

// const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//     new: true,
//     runValidators: true
// });

// res.status(200).json({
//     success: true,
//     data: user
// });


const _ = require('underscore');

const Q = require("q");

cloudinary.config({
    cloud_name: "sprintcorp",
    api_key: "771228328885469",
    api_secret: "P3B2MOR2eoXZNHIsfYfSV412Owc"

});

class file_management {

    constructor(file) {
        this.file = file
    }

    upload() {
        return new Q.Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(this.file, { width: 850, height: 400 }, (err, res) => {
                if (err) {
                    console.log('cloudinary err:', err);
                    reject(err);
                } else {
                    console.log('cloudinary res:', res);
                    return resolve(res.url);
                }
            });
        });
    }

    delete() {
        const deleteimage = async() => {
            await cloudinary.uploader.destroy(
                "e0gbgemwsj4xgxf1vgav", { invalidate: true, resource_type: "raw" },
                function(err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(res);
                }
            )
        }
    }
}

module.exports = file_management;