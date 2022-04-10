const ErrorResponse = require('../middleware/ErrorResponse');
const Category = require('../models/categoryModel');
const slugify = require('slugify');



exports.createCategory = async (req, res, next) => {
    try {
        let { title, description } = req.body;
        if (!title) return next(new ErrorResponse('Category title is required', 400));
        if (!description) description = 'No description provided';

        Category.findOne({title}).exec((err, category) => {
            if (err) return next(new ErrorResponse('Server error', 500));
            if (category && category.title) return next(new ErrorResponse('Category already exists', 400));
        });

        const newCategory = new Category({title, slug: slugify(title.toLowerCase().trim()), description});
        newCategory.save((err, category) => {
            if (err) return next(new ErrorResponse('Error. Category NOT saved', 500));
            res.status(201).json({category});
        })
        
    } catch (error) {
        next(error);
    }
}