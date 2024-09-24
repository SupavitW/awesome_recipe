const express = require('express');
const ingredientsRouter = express.Router();
const db = require('../db');
const {sanitizeInput} = require('../helper/helper');
const {authenticateUser} = require('./mainRouter');

// Destructuring sequelize objects from db
const { Shopping_List, Ingredients} = db;

ingredientsRouter.get('/getAllIngredients', async(req, res, next) => {
    try {
        const ingredients = await Ingredients.findAll();
        res.status(200).json(ingredients);
    } catch(err) {  
        next(err);
    }
});

ingredientsRouter.post('/addToShoppingList/:id', authenticateUser, async(req, res, next) => {
    try {
        const { unit, quantity } = req.body;
        console.log(req.body)
        // Sanitize user's input
        if (!sanitizeInput('addToShoppingList', { unit, quantity })) {
            const invalidInput = new Error('Invalid user input');
            invalidInput.status = 400;
            throw invalidInput; 
        }
        // Find the shopping list of the authenticated user
        const shoppingList = await Shopping_List.findOne({ where: { user_id: req.userId } });
        // Find the ingredient with corresponding id to add
        const ingredient = await Ingredients.findByPk(req.params.id);
        // Check if there is no duplciate ingredient in the shopping list
        const duplicate = await Shopping_lists_ingredients.findOne(
            {where: { shopping_list_id: shoppingList.id,
                      ingredient_id: ingredient.id}
            }
        );
        if (duplicate) {
            const duplicateIngredient = new Error('The ingredient is already exist in the shopping list');
            duplicateIngredient.status = 400;
            throw duplicateIngredient; 
        }
        // Add the ingredient to the shopping list through junction model
        await shoppingList.addIngredient(ingredient, { through: { unit, quantity } });

        res.status(201).json({ "msg": "Added the ingredient to your shopping list" });
    } catch (err) {
        next(err);
    }
});

module.exports = ingredientsRouter;