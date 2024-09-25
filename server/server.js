// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv-extended').load();
const helmet = require('helmet');

// Allow the server to sync with sequelize 
const db = require('./db');
db.sequelize.sync();

// initilize env variables + configure port number
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Instantiate express server instance
const server = new express();

// Middleware for logging
server.use(morgan('short'));

// Setting security header
server.use(helmet());

// Middleware for handling CORS requests 
server.use(cors({
    origin: 'https://awesome-recipe-static.onrender.com', // Replace with frontend origin
    credentials: true,
}));

// Middlerware for parsing req.body
server.use(bodyParser.json());

// Middleware for parsing req.file
const upload = multer();
server.use(upload.single('recipe_pic'));

// Middleware for parsing req.cookie
server.use(cookieParser());

// Router
server.get('/', (req, res) => {
    res.status(200).json('My_Recipe is operating at your service!');
})

const {mainRouter} = require('./route/mainRouter'); 
server.use('/', mainRouter);

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }
    if (!err.message) {
        err.message = 'Internal server error';
    }
    console.log(`Error ${err.status}: ${err.message}`);
    console.log(err.stack);

    res.status(err.status).json({"Error": err.message});
}
server.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports =  server;
