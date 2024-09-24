const express = require('express');
const mainRouter = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv-extended').load();
const {sanitizeInput, passwordHash, comparePasswords} = require('../helper/helper');

// Destructuring sequelize objects from db
const {Users, Shopping_List} = db;

// Auth middleware for authorization
const authenticateUser = async(req, res, next) => {
    try {
        const authToken = req.cookies.token;
        // Check if the user has the token
        if (!authToken) {
            const noCredential = new Error('User is not authenticated, please login');
            noCredential.status = 401;
            throw noCredential;
        }
        // Check signature through token verification
        // eslint-disable-next-line no-undef
        const user = jwt.verify(authToken, process.env.SECRET); 
        if (user) {
            // Double check the user with db
            const foundMatch = await Users.findOne({where: {id: user.id, username: user.username}});
            if (!foundMatch) {
                res.status(404).json({"msg": "User not found"});
            }
            // Attach user's identification to req
            req.userId = foundMatch.id;
            req.username = foundMatch.username;
            next();
        }
    } catch(err) {
        next(err);
    }
}; 

// Register endpoint
mainRouter.post('/register', async(req, res, next) => {
    try {
        const {username, password, firstname, lastname} = req.body;

        // Check if the user exists
        const user = await Users.findOne({where: {username: username}});
        if (user) {
            res.status(400).json({"msg": "Username already exists"});
        }

        // Validate user input
        if (!sanitizeInput('register', {username, password, firstname, lastname})) {
            const invalidInput = new Error('Invalid user input');
            invalidInput.status = 400;
            throw invalidInput;
        }

        // Storing user's info to database
        const hashedPassword = await passwordHash(password, 10);
        const newUser = await Users.create({ username: username, password: hashedPassword, firstname: firstname, lastname: lastname });
        if (newUser) {
            res.status(201).json({firstname, lastname});
        } else {
            const registerFail = new Error('Register Failure');
            throw registerFail;
        }
        // Create user's shopping list
        await Shopping_List.create({title: `${firstname}'s Shopping List`, user_id: newUser.id});
    } catch(err) {
        next(err);
    }
});

// Login endpoint
mainRouter.post('/login', async(req, res, next) => {
    try{
        const {username, password} = req.body;

        // Validate user input
        if (!sanitizeInput('login', {username, password})) {
            res.status(400).json({"msg":'Invalid user input'});
        }

        // Comparing password
        const user = await Users.findOne({where: {username: username}});
        if (!user) {
            res.status(403).json({"msg": "User not found"});
        }
        
        if(!await comparePasswords(password, user.password)) {
            res.status(401).json({"msg":'Incorrect password'});
        } 
        
        // Create token
        const { id } = user;
        // eslint-disable-next-line no-undef
        const token = jwt.sign({id, username}, process.env.SECRET, {expiresIn: '1h'});
        res.status(202).cookie('token', token, { 
            maxAge: 600000, // 10 mins 
            secure: true, // false for production only
            httpOnly: true,
            sameSite: 'none',
        }).json({"firstname":user.firstname, "lastname": user.lastname});
        
    } catch(err) {
        next(err);
    }
});

mainRouter.get('/logout', (req, res, next) => {
    try {
        const authToken = req.cookies.token;
        if (!authToken) {
            res.status(204) // No Content
        }
        // Clears the 'token' cookie and set the immediate expire date to prevent client-side caching
        res.status(200).clearCookie('token', { expires: new Date(0) }) 
        .json({"msg": "Logout Successfully"});
    } catch(err) {
        next(err);
    }
});

module.exports = {mainRouter, authenticateUser};

//Importing sub-routers
const editProfileRouter  = require('./editProfilePath');
const ingredientsRouter = require('./ingredientsPath');
const myShoppingListRouter = require('./myShoppingListPath');
const recipesRouter = require('./recipesPath');
const myFavRouter = require('./myFavRecipePath');

//Mounting sub-routers to the main api router
mainRouter.use('/recipes', recipesRouter);
mainRouter.use('/ingredients', ingredientsRouter); 
mainRouter.use('/editProfile', authenticateUser, editProfileRouter); 
mainRouter.use('/myShoppingList', authenticateUser, myShoppingListRouter);
mainRouter.use('/myFavRecipes', authenticateUser, myFavRouter);