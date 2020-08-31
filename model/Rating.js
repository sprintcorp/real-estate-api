const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    agent: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Prevent user from submitting more than one Rating per agent
RatingSchema.index({ agent: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
// RatingSchema.statics.getAverageRating = async function(agentId) {
//     const obj = await this.aggregate([{
//             $match: { agent: agentId }
//         },
//         {
//             $group: {
//                 _id: agentId,
//                 averageRating: { $avg: this.rating }

//             }
//         }
//     ]);
//     // console.log(obj[0].averageRating);
//     try {
//         await this.model('User').findByIdAndUpdate(agentId, {
//             averageRating: obj[0].averageRating
//         });

//     } catch (err) {
//         console.error(err);

//     }
// };

// Call getAverageCost after save
// RatingSchema.post('save', async function() {
//     await this.constructor.getAverageRating(this.user);
// });

// // Call getAverageCost before remove
// RatingSchema.pre('remove', async function() {
//     await this.constructor.getAverageRating(this.user);
// });

module.exports = mongoose.model('Rating', RatingSchema);