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



exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) return next(new ErrorResponse('No categories found', 404));

        res.status(200).json({categories});
        
    } catch (error) {
        next(error);
    }
}



exports.getCategoryBySlug = async (req, res, next) => {
    try {
        const categorySlug = req.params.slug;
        const category = await Category.findOne({slug: categorySlug});
        if (!category || !category.slug) return next(new ErrorResponse('Category not found', 404));
        res.status(200).json({category});
        
    } catch (error) {
       next(error); 
    }
}



exports.updateCategory = async (req, res, next) => {
    try {
        let {title, description, _id} = req.body;
        if (!title || title.trim() === '') return next(new ErrorResponse('Title is required', 400));
        if (!description || description.trim() === '') description = 'No description provided';
        if (!_id) return next(new ErrorResponse('Category id is required', 400));

        const category = await Category.findById(_id);
        if (!category) return next(new ErrorResponse('Category not found', 404));

        const updatedCategory = await Category.findByIdAndUpdate(_id, {title, description}, {new: true});
        if (!updatedCategory) return next(new ErrorResponse('Error. Category NOT updated', 500));

        res.status(200).json({category: updatedCategory});
        
    } catch (error) {
        next(error);
    }
}