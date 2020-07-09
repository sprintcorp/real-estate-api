const mongoose = require('mongoose');
const slugify = require("slugify");

const HouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [20, "Name can not be more than 20 characters"],
    },
    image: {
        type: []
    },
    slug: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    },
    features: {
        type: []
    }
});

//Create House slug from name
HouseSchema.pre("save", function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('House', HouseSchema);
module.exports = mongoose.model('House', HouseSchema);