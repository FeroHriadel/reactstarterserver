const ErrorResponse = require('../middleware/ErrorResponse');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.signup = async (req, res, next) => {
    try {
        //check req.body
        let { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Email and Password are required', 400));
        
        //check if user is new
        User.findOne({email}).exec((err, user) => {
            if (err) {
                return next(new ErrorResponse('Server error', 500));
            }

            if (user) {
                return next(new ErrorResponse('Email already taken', 400));
            }
        });

        //hash password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        //save user
        let newUser = new User({email, password});
        newUser.save((err, user) => {
            if (err) {
                return next(new ErrorResponse('Error. User NOT saved', 500));
            }

            //generate token with {_id: user._id} in it:
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

            //set cookie
            res.cookie('token', token);

            //respond with token and user
            const {_id, email, role } = user;
            res.status(201).json({
                token,
                user: {_id, email, role}
            });
        })
        
    } catch (error) {
        next(error);
    }
}



exports.signin = async (req, res, next) => {
    try {
        //check req.body
        let { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Email and Password are required', 400));

        //check if user exists
        const user = await User.findOne({email});
        if (!user || !user.email) return next(new ErrorResponse('Invalid Credentials (check1)', 401));

        //check password
        const isMatch = await bcrypt.compare(password.toString(), user.password);
        if (!isMatch) return next(new ErrorResponse('Invalid credentials (check2)', 401));

        //remove password from user
        user.password = undefined;

        // respond with json & cookie, both: {_id: user._id}
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('token', token).status(200).json({token, user: {_id: user._id, email: user.email, role: user.role}});

    } catch (error) {
        next(error);
    }
}



exports.getUser = async (req, res, next) => {
    try {
        //requireSignin middleware ran before this and popullated req.user = {email, _id, role}
        res.status(200).json({user: req.user});
        
    } catch (error) {
        next(error);
    }
}