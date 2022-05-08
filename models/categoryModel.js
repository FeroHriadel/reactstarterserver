const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
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
    },
    image: {public_id: {type: String}, url: {type: String}}
}, {timestamps: true});



module.exports = mongoose.model('Category', categorySchema);