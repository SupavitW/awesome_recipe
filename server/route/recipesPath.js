const express = require('express');
const recipesRouter = express.Router();
const db = require('../db');
const { authenticateUser } = require('./mainRouter');
const { sanitizeInput, convertToBase64 } = require('../helper/helper');

// Destructuring sequelize objects from db
const {Recipes, Recipe_pics, Users, Ingredients,Shopping_List} = db;

// Access Op object from db
const Op = db.Sequelize.Op;

recipesRouter.get('/getAllRecipes', async(req, res, next) => {
    try {
        const recipes = await Recipes.findAll({
            attributes: {
                exclude: ['created_by_user'] // Exclude the specified column
            },
            include: [
            { model: Ingredients, // Include the Ingredients model
              attributes: {exclude: ['id']},
              required: true,
              through: { attributes: ['unit', 'quantity'], as: 'measurements'}
            }, {model: Users,
                required: true,
                attributes: ['firstname']
            }, {model: Recipe_pics, 
                required: true, // Inner join to ensure only recipes with pictures are retrieved
                attributes: ['imageData']// Specify the column from Recipe_pics
            }]
        });
        // Transfrom buffer data to base64
        const convertedRecipes = convertToBase64(recipes);
        res.status(200).json(convertedRecipes);
    } catch(err) {  
        next(err);
    }
});

recipesRouter.get('/getRecipesByCategory/:category', async(req, res, next) => {
    try {
        const recipes = await Recipes.findAll({
            where: {category: req.params.category},
            attributes: {
                exclude: ['created_by_user'] 
            },
            include: [
                {model: Ingredients,
                 attributes: {exclude: ['id']},
                 required: true,
                 through: { attributes: ['unit', 'quantity'], as: 'measurements'} },
                 {model: Users,
                     required: true,
                     attributes: ['firstname']
                 },
                {model: Recipe_pics, 
                required: true, 
                attributes: ['imageData']},
            ]
        });
        // if there's no recipe in that category
        if (!recipes) {
            res.status(404).json({"msg": "No recipe in this category"});
        }
        const convertedRecipes = convertToBase64(recipes);
        res.status(200).json(convertedRecipes);
    } catch(err) {  
        next(err);
    }
});

// Search recipes by title
recipesRouter.get('/search', async (req, res, next) => {
    try {
        const { title, category } = req.query; 
        // Perform the search using Sequelize
        // Case-insensitive search for recipes containing the query string
        const recipes = await Recipes.findAll({
            where: {
                [Op.and]: [
                    { title: { [Op.iLike]: `%${title}%` } },
                    { category: { [Op.iLike]: `%${category}%` } }
                ]
            },
            attributes: {
                exclude: ['created_by_user'] // Exclude the specified column
            },
            include: [
                {
                    model: Users,
                    required: true,
                    attributes: ['firstname']
                },
                {
                    model: Recipe_pics,
                    required: true,
                    attributes: ['imageData', 'imageType']// Specify the column from Recipe_pics
                }
            ]
        });
        // Transfrom buffer data to base64
        const convertedRecipes = convertToBase64(recipes);
        res.status(200).json(convertedRecipes); // Send the recipes' title to render on the web's search bar
    } catch (error) {
        next(error);
    }
});

recipesRouter.get('/getRecipe/:id', async(req, res, next) => {
    try {
        const recipe = await Recipes.findByPk(req.params.id, {
            attributes: {
                exclude: ['created_by_user'] 
            },
            include: [
                {model: Ingredients,
                 required: true,
                 through: { attributes: ['unit', 'quantity'], as: 'measurements'} },
                 {model: Users,
                     required: true,
                     attributes: ['firstname', 'lastname']
                 },
                {model: Recipe_pics, 
                required: true, 
                attributes: ['imageData']},
            ]
        });
        if (!recipe) {
            res.status(404).json({"msg": "Recipe not found"});
        }
        const convertedRecipes = convertToBase64(recipe);
        res.status(200).json(convertedRecipes);
    } catch(err) {  
        next(err);
    }
});

recipesRouter.post('/createRecipe', authenticateUser, async(req, res, next) => {
    try {
        // Pull user input from request body
        const { title, description, category, preparation_time, ingredients, instructions } = req.body;
        //Sanitize user input
        if(!sanitizeInput('createRecipe', { title, description, category, preparation_time})) {
            const invalidInput = new Error('Invalid user input');
            invalidInput.status = 400;
            throw invalidInput; 
        }
        // Check for duplicating recipe from the same user
        const duplicateRecipe = await Recipes.findOne({where: {title, created_by_user: req.userId}});
        if(duplicateRecipe) {
            const duplicateErr = new Error('The recipe already exists');
            duplicateErr.status = 400;
            throw duplicateErr;
        }
        // No file was uploaded, return an error response
        if (!req.file) {
            const noPic = new Error('No picture of recipe uploaded');
            noPic.status = 400;
            throw noPic;
        }
        // Get user
        const user = await Users.findByPk(req.userId);
        // Parse the instructions from string back to array
        const parsedInstructions = JSON.parse(instructions);
        // Parse the ingredients from string back to array
        const parsedIngredients = JSON.parse(ingredients);
        // Create new recipe with attaching user's id
        const newRecipe = await user.createRecipe({
            title,
            description,
            category,
            preparation_time,
            instructions: parsedInstructions
        });
        // Create relevant ingredients with the new recipe
        for (const item of parsedIngredients) {
            // Check if the ingredient already exists
            const ingredient = await Ingredients.findOne({where: {title: item.title.toLowerCase()}});
            if (ingredient) {
                // if there is already ingredient in the database - add ingredient to the junction table
                await newRecipe.addIngredient(ingredient, {
                    through: {
                        unit: item.unit,
                        quantity: item.quantity
                    }
                });
            } else {
                // if there is not - create new ingredient and add to the junction table
                const newIngredient = await Ingredients.create({title: item.title.toLowerCase()});
                await newRecipe.addIngredient(newIngredient, {
                    through: {
                        unit: item.unit,
                        quantity: item.quantity
                    }
                });
            }
        }
        // Create the recipe pic in the database
        await newRecipe.createRecipe_pic({
            imageType: req.file.mimetype,
            imageName: req.file.originalname,
            imageData: req.file.buffer, 
        });
        res.status(201).json({"msg": "Your recipe has been created"});
    } catch(err) {
        next(err);
    }
});

// Use myRecipesPath
const myRecipesRouter = require('./myRecipesPath');
recipesRouter.use('/myRecipes', authenticateUser, myRecipesRouter);

recipesRouter.post('/addAllToShoppingList/:id', authenticateUser, async(req, res, next) => {
    try {
        // Get user Shopping List
        const userShoppingList = await Shopping_List.findOne({where: {user_id: req.userId}});
        // Get the recipe instance
        const recipe = await Recipes.findByPk(req.params.id);
        // Get all ingredients to add
        const ingredients = await recipe.getIngredients();

        // Add ingredients to the user's shopping list
        for (const ingredient of ingredients) {
            // Check for duplicate ingredients in user's shopping list
            const duplicate = await Shopping_lists_ingredients.findOne(
            {where: { shopping_list_id: userShoppingList.id,
                      ingredient_id: ingredient.id}
            });
            if (duplicate) {
                const duplicateIngredient = new Error('Some ingredient is already exist in the shopping list');
                duplicateIngredient.status = 400;
                throw duplicateIngredient; 
            }
            const {unit, quantity} = ingredient.recipes_ingredients;
            await userShoppingList.addIngredient(ingredient, {through: {unit, quantity}});
        }
        res.status(201).send({"msg": "Added all ingredients to user's shopping list"});
    } catch(err) {
        next(err);
    }
});

recipesRouter.post('/addToFav/:id', authenticateUser, async(req, res, next) => {
    try{
        // eslint-disable-next-line no-undef
        await Users_recipes_fav.create({user_id: req.userId, recipe_id: req.params.id});
        res.status(201).send({"msg": "Added the recipe to user's favorite recipes"});
    } catch(err) {
        next(err);
    }
});

module.exports = recipesRouter;