const express = require('express');
const myShoppingListRouter = express.Router();
const db = require('../db');
const {authenticateUser} = require('./mainRouter');

// Destructuring sequelize objects from db
const {Shopping_List, Ingredients} = db;

myShoppingListRouter.get('/', authenticateUser, async (req, res, next) => {
    try {
        const userShoppingList = await Shopping_List.findOne({where: {user_id: req.userId},
            attributes: ['title'],
            include: {
                model: Ingredients,
                required: true,
               through: { attributes: ['unit', 'quantity'], as: 'measurements'}
            }
        });
        if(!userShoppingList) {
            res.status(200).json({"msg": "User's shopping list is empty."})
        } else res.status(200).json(userShoppingList);
    } catch (err) {
        next(err);
    }
});

myShoppingListRouter.delete('/remove/:id', authenticateUser, async ( req, res, next) => {
    try {
        // Find user shopping list
        const userShoppingList = await Shopping_List.findOne({ where: { user_id: req.userId }});
        // Get specific ingredient to remove
        const ingredient = await Ingredients.findByPk(req.params.id);
        // Remove the ingredient
        await userShoppingList.removeIngredient(ingredient);
        res.status(200).json({ "msg": "Ingredient removed from shopping list" });
    } catch(err) {
        next(err);
    }
});

myShoppingListRouter.delete('/removeAll', authenticateUser, async ( req, res, next) => {
    try {
        // Find user shopping list
        const userShoppingList = await Shopping_List.findOne({ where: { user_id: req.userId }});
        // Find all associcated ingredients
        const ingredients = await userShoppingList.getIngredients();
        // Remove all ingredients
        await userShoppingList.removeIngredients(ingredients);
        res.status(200).json({ "msg": "All ingredients removed from shopping list" });
    } catch(err) {
        next(err);
    }
});

module.exports = myShoppingListRouter;