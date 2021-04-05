const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');//HTTP request logger middleware for node.js
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const axios = require('axios');
const cheerio = require('cheerio');

//Load env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

//Route files
const members = require('./routes/members.js');

const app = new express();

// Body parser
app.use(express.json());

// logs out to console
//app.use(logger);
//Dev logging middlware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//Mount routers
app.use('/api/v1/members', members);

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => {
        process.exit(1);
    })
});