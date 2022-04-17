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