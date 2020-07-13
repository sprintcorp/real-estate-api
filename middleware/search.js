exports.search = (model, check, condition) => async(req, res, next) => {
    return await model.find({ check: condition });
}