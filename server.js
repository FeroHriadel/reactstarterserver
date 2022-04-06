//IMPORTS & VARIABLES
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');



//DB
connectDB();



//APP MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



//ROUTES
app.use('/api/users', userRoutes);



//HANDLE ERRORS (must be at the end)
app.use(errorHandler);



//RUN SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow);
})



//UNHANDLED REJECTIONS
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
})