const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    restCode: {
        type: String
    }
}, {timestamps: true});



module.exports = mongoose.model('User', userSchema);