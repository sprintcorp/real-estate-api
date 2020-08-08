const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const geocoder = require("../utils/geocoder");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please add a firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please add a lastname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email",
        ],
    },
    phone: {
        type: String,
        maxlength: [20, "Phone number can not be more than 20 characters"],
    },
    image: {
        type: String
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

    role: {
        type: String,
        enum: ['user', 'agent'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
//Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash token and set resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

// Geocode and create location field

UserSchema.pre("save", async function(next) {
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

UserSchema.virtual('user', {
    ref: 'House',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

module.exports = mongoose.model('User', UserSchema);