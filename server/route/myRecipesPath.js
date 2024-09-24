/* eslint-disable no-undef */
const express = require('express');
const myRecipesRouter = express.Router();
const db = require('../db');
const { sanitizeInput, convertToBase64 } = require('../helper/helper');

// Destructuring sequelize objects from db
const {Recipes, Recipe_pics, Ingredients} = db;

myRecipesRouter.get('/', async(req, res, next) => {
    try {
        const userRecipes = await Recipes.findAll({
            where: {created_by_user: req.userId},
            attributes: {
                exclude: ['created_by_user'] // Exclude the specified column
            },
            include: [
            { model: Ingredients, // Include the Ingredients model
              attributes: {exclude: ['id']},
              required: true,
              through: { attributes: ['unit', 'quantity'], as: 'measurements'}
            },{model: Recipe_pics, 
               required: true, // Inner join to ensure only recipes with pictures are retrieved
               attributes: ['imageData']// Specify the column from Recipe_pics
            }]
        });
        if (userRecipes.length === 0) {
            res.status(200).json([]);
        } else {
            const convertedRecipes = convertToBase64(userRecipes);
            res.status(200).json(convertedRecipes);
        }
    } catch(err) {
        next(err);
    }
});

myRecipesRouter.put('/editRecipe/:id', async(req, res, next) => {
    try {
        // Check if the target recipe is owned by the user
        const recipe = await Recipes.findOne({ where: { created_by_user: req.userId, id: req.params.id } });
        if (!recipe) {
            const unAuthorized = new Error('User is not allowed to edit the recipe');
            unAuthorized.status = 401;
            throw unAuthorized;
        }
        const { title, description, category, preparation_time, ingredients, instructions } = req.body;
        //Sanitize user input
        if(!sanitizeInput('createRecipe', { title, description, category, preparation_time, instructions})) {
            const invalidInput = new Error('Invalid user input');
            invalidInput.status = 400;
            throw invalidInput; 
        }
        // Parsing the updated recipe form data
        // Parse the instructions from string back to array
        const parsedInstructions = JSON.parse(instructions);
        // Parse the ingredients from string back to array
        const parsedIngredients = JSON.parse(ingredients);
        // Update the recipe 
        await recipe.update({ title, description, category, preparation_time, instructions: parsedInstructions });

        // Update the recipe's ingredients
        // Get the existing ingredients associated with the recipe after update
        const originalIngredients = await recipe.getIngredients();
        // Update existing ingredients and remove any that are no longer present in the updated ingredient list
        for (const originalIngredient of originalIngredients) {
            const updatingIngredient = parsedIngredients.find(item => item.title.toLowerCase() === originalIngredient.title.toLowerCase());
            if (updatingIngredient) {
                // Update the existing ingredient
                // eslint-disable-next-line no-undef
                await Recipes_ingredients.update(
                    { unit: updatingIngredient.unit, quantity: updatingIngredient.quantity },
                    { where: { recipe_id: recipe.id, ingredient_id: originalIngredient.id } });
            } else {
                // Remove the ingredient from the recipe
                await recipe.removeIngredient(originalIngredient);
            }
        }
        // Fetch the current state of ingredients associated with the recipe after update
        const temp = await recipe.getIngredients();
        // Add new ingredients that are not already associated with the recipe
        for (const item of parsedIngredients) {
            const existingIngredient = temp.find(ingredient => ingredient.title.toLowerCase() === item.title.toLowerCase());
            if (!existingIngredient) {
                const ingredient = await Ingredients.findOne({ where: { title: item.title.toLowerCase() } });
                if (ingredient) {
                    await recipe.addIngredient(ingredient, {
                        through: {
                            unit: item.unit,
                            quantity: item.quantity
                        }
                    });
                } else {
                    const newIngredient = await Ingredients.create({ title: item.title.toLowerCase() });
                    await recipe.addIngredient(newIngredient, {
                        through: {
                            unit: item.unit,
                            quantity: item.quantity
                        }
                    });
                }
            }
        }
        // If the user uploaded pic, also update the pic 
        if (req.file) {
            await Recipe_pics.update({
                imageType: req.file.mimetype,
                imageName: req.file.originalname,
                imageData: req.file.buffer
            },
            {
                where: { recipe_id: recipe.id }
            });
        }
        res.status(201).json({"msg": "Your recipe has been updated"})
    } catch(err) {
        next(err);
    }
});

myRecipesRouter.delete('/deleteRecipe/:id', async(req, res, next) => {
    try {
        // Check if the target recipe is owned by the user
        const recipe = await Recipes.findOne({ where: { created_by_user: req.userId, id: req.params.id } });
        if (!recipe) {
            const unAuthorized = new Error('User is not allowed to edit the recipe');
            unAuthorized.status = 401;
            throw unAuthorized;
        }

        // Delete the references in the users_recipes_fav table
        const userFavRecipe = await Users_recipes_fav.findOne({ where: { recipe_id: req.params.id }}) || null;
        if (userFavRecipe) await Users_recipes_fav.destroy({ where: { recipe_id: req.params.id } });

        // Delete the recipe
        await recipe.destroy();
        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

module.exports = myRecipesRouter;