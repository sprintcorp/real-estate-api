const mongoose = require('mongoose');
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [20, "Name can not be more than 20 characters"],
    },
    description: {
        type: String
    },
    slug: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}, );

//Create Category slug from name
CategorySchema.pre("save", function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

CategorySchema.virtual('houses', {
    ref: 'House',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

module.exports = mongoose.model('Category', CategorySchema);