const mongoose = require('mongoose');
const slugify = require("slugify");

const PhotoSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: "no-photo.jpg",
    },

    // house: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'House',
    //     required: true
    // }
});


module.exports = mongoose.model('Photo', PhotoSchema);