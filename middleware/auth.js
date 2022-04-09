const jwt = require('jsonwebtoken');
const ErrorResponse = require('./ErrorResponse');
const User = require('../models/userModel');



//REQUIRE SIGNIN 
//(gets Authorization Bearer token from frontend in headers. 
//The token has user's _id in it. Finds user by _id
//and puts all user's details into req.user = {email, role, ...})
exports.requireSignin = async (req, res, next) => {
    try {
        //get token
        let token;
        if (req.headers && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) return next(new ErrorResponse('Unauthorized', 401));

        //verify token
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
            if (err) return next(new ErrorResponse('Unauthorized', 401));

            //get user from db
            const user = await User.findById(decoded._id);
            if (!user) return next(new ErrorResponse('Non-existing user', 401));

            //put userDetails into req.user = {email, role...}
            delete user.password;
            req.user = user;
            next();
        })

    } catch (error) {
        next(error)
    }
}
