class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;



/* 
USE LIKE THIS:



const ErrorResponse = require('../middleware/ErrorResponse');

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Email and password are required', 400)); 

    } catch (error) {
        next(error); //default error without custom message or statusCode
    }
}


*/