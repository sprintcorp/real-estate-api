const User = require("../model/User");
const House = require("../model/House");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const utils = require("../utils/helper");


exports.getAgents = asyncHandler(async(req, res, next) => {
    const agent = await User.find({ role: 'agent' })
    if (!agent) {
        return next(new ErrorResponse('No Agent Available', 404))
    }
    res.status(200).json({
        success: true,
        data: agent
    });
})

exports.getAgentHouse = asyncHandler(async(req, res, next) => {
    const agent = await User.findById(req.params.user).populate('user');
    if (!agent) {
        return next(new ErrorResponse('No Agent Available with this id', 404))
    }
    res.status(200).json({
        success: true,
        data: agent
    });
})


exports.getAgentBySearch = asyncHandler(async(req, res, next) => {
    const def = new utils(req.query.name)
    const users = await User.find({
        $or: [{
                administrativeLevels: def.Case
            }, { neighborhood: def.Case },
            { city: def.Case },
            { street: def.Case }
        ]
    });
    res.status(200).json({ success: true, length: users.length, data: users });
})