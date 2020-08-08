const mongoose = require('mongoose');
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const HouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
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

    price: {
        type: Number,
    },
    features: {
        type: []
    },
    network: {
        type: []
    },
    address: {
        type: String,
        default: "Nigeria"
    },
    city: String,
    state: String,
    neighborhood: String,
    administrativeLevels: String,
    country: String,
    countryCode: String,
    street: String,
    location: {
        //Geocode address
        type: {
            type: String,
            enum: ["Point"],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
            index: "2dsphere",
        },
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Create House slug from name
HouseSchema.pre("save", function(next) {
    this.slug = slugify(this.name, { lower: true }) + "-" + Math.random() * (50 - 1) + 50;
    next();
});

HouseSchema.pre("save", async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,

    };
    this.city = loc[0].city,
        this.street = loc[0].streetName,
        this.state = loc[0].state,
        this.administrativeLevels = loc[0].administrativeLevels.level2long,
        this.neighborhood = loc[0].extra.neighborhood,
        this.countryCode = loc[0].countryCode,
        this.country = loc[0].country,
        this.address = loc[0].formattedAddress;
    next();
});

HouseSchema.virtual('house', {
    ref: 'UserHouse',
    localField: '_id',
    foreignField: 'house',
    justOne: false
});
module.exports = mongoose.model('House', HouseSchema);