const User = require("../model/User");
const House = require("../model/House");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


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

exports.getAgent = asyncHandler(async(req, res, next) => {
    const agent = await User.find({ _id: req.params.id })
    if (!agent) {
        return next(new ErrorResponse('No Agent Available with this id', 404))
    }
    res.status(200).json({
        success: true,
        data: agent
    });
})

exports.getAgentHouse = asyncHandler(async(req, res, next) => {
    const agent = await House.find({ user: req.params.user })
    if (!agent) {
        return next(new ErrorResponse('No Agent Available', 404))
    }
    res.status(200).json({
        success: true,
        data: agent
    });
})