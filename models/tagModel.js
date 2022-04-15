const mongoose = require('mongoose');



const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: 'No description provided'
    }
}, {timestamps: true});



module.exports = mongoose.model('Tag', tagSchema);