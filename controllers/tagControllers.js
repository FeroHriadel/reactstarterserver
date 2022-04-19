const ErrorResponse = require('../middleware/ErrorResponse');
const Tag = require('../models/tagModel');
const slugify = require('slugify');



exports.createTag = async (req, res, next) => {
    try {
        let { title, description } = req.body;
        if (!title) return next(new ErrorResponse('Tag title is required', 400));
        if (!description) description = 'No description provided';

        Tag.findOne({title}).exec((err, tag) => {
            if (err) return next(new ErrorResponse('Server error', 500));
            if (tag && tag.title) return next(new ErrorResponse('Tag already exists', 400));
        });

        const newTag = new Tag({title, slug: slugify(title.toLowerCase().trim()), description});
        newTag.save((err, tag) => {
            if (err) return next(new ErrorResponse('Error. Tag NOT saved', 500));
            res.status(201).json({tag});
        })
        
    } catch (error) {
        next(error);
    }
}



exports.getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find().sort([['title', 'asc']]);
        if (!tags || !tags.length === 0) return next(new ErrorResponse('No tags found', 404));

        res.status(200).json({tags});
        
    } catch (error) {
        next(error);
    }
}



exports.getTagBySlug = async (req, res, next) => {
    try {
        const tagSlug = req.params.slug;
        const tag = await Tag.findOne({slug: tagSlug});
        if (!tag || !tag.slug) return next(new ErrorResponse('Tag not found', 404));
        res.status(200).json({tag});
        
    } catch (error) {
       next(error); 
    }
}



exports.updateTag = async (req, res, next) => {
    try {
        let {title, description, _id} = req.body;
        if (!title || title.trim() === '') return next(new ErrorResponse('Title is required', 400));
        if (!description || description.trim() === '') description = 'No description provided';
        if (!_id) return next(new ErrorResponse('Tag id is required', 400));

        const tag = await Tag.findById(_id);
        if (!tag) return next(new ErrorResponse('Tag not found', 404));

        const updatedTag = await Tag.findByIdAndUpdate(_id, {title, description}, {new: true});
        if (!updatedTag) return next(new ErrorResponse('Error. Tag NOT updated', 500));

        res.status(200).json({tag: updatedTag});
        
    } catch (error) {
        next(error);
    }
}