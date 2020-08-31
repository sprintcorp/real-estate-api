const Category = require("../model/Category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require('path');


//@desc Get all categories
//@route GET /api/v1/categories
//@accss Public
exports.getCategories = asyncHandler(async(req, res, next) => {

    // const category = await Category.find();
    res.status(200).json(res.advancedResults);
});


//@desc Get categories
//@route GET /api/v1/categories/:id
//@accss Public
exports.getCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id).select('houses').populate('houses');
    if (!category) {
        // res.status(404).json({success:false,data:error.message})
        return next(
            new ErrorResponse(`category not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: category });
});

//@desc Get categories by slug
//@route GET /api/v1/categories/cat/:slug
//@accss Public
exports.getCategoryBySlug = asyncHandler(async(req, res, next) => {
    const { slug } = req.params;
    const category = await Category.find({ slug: slug }).populate('houses');
    if (!category) {
        // res.status(404).json({success:false,data:error.message})
        return next(
            new ErrorResponse(
                `category not found with slug of ${req.params.slug}`,
                404
            )
        );
    }
    res.status(200).json({ success: true, data: category });
});

//@desc  Create new categories
//@route POST /api/v1/categories
//@accss Private
exports.createCategory = asyncHandler(async(req, res, next) => {
    //Add user to req,body
    req.body.user = req.user.id;
    console.log(req.user.id);
    //if the user is not an admin,they can't add category
    if (req.user.role !== 'admin') {
        return next(new ErrorResponse(`This user does not have access to this resource`, 401));
    }
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
});



//@desc Update categories
//@route PUT /api/v1/categories/:id
//@accss Private
exports.updateCategory = asyncHandler(async(req, res, next) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
        // res.status(400).json({success:false,data:error.message});
        return next(
            new ErrorResponse(`category not found with id of ${req.params.id}`, 404)
        );
    }
    // Make ure user is an admin
    if (req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User is not authoried to update category`, 403)
        );
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({ success: true, data: category });
});



//@desc Delete categories
//@route DELETE /api/v1/categories/:id
//@accss Private
exports.deleteCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(
            new ErrorResponse(`category not found with id of ${req.params.id}`, 404)
        );
    }
    // Make ure user is an admin
    if (req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User is not authoried to update category`, 403)
        );
    }
    category.remove();
    res
        .status(200)
        .json({ success: true, data: "category Successfully deleted" });
});