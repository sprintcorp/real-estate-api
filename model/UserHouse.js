const mongoose = require('mongoose');
const slugify = require("slugify");

const UserHouseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    house: {
        type: mongoose.Schema.ObjectId,
        ref: 'House',
        required: true
    }
});




module.exports = mongoose.model('UserHouse', UserHouseSchema);