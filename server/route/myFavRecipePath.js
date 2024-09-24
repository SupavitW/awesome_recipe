const express = require('express');
const myFavRouter = express.Router();
const db = require('../db');
const {convertToBase64} = require('../helper/helper');

// Destructuring sequelize objects from db
const { Recipe_pics, Users, Ingredients } = db;

myFavRouter.get('/', async (req, res, next) => {
   try {
    const user = await Users.findByPk(req.userId);
    const myFavlist = await user.getFavoriteRecipes({
        exclude: ['created_by_user'],
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
    if (myFavlist.length > 0) {
        const updatedList = convertToBase64(myFavlist);
        res.status(200).json(updatedList);
    } else {
        res.status(200).json({});
    }
   } catch(err) {
    next(err);
   } 
});

myFavRouter.delete('/unFavRecipe/:id', async(req, res, next) => {
    try {
        const user = await Users.findByPk(req.userId);
        await user.removeFavoriteRecipe(req.params.id);
        res.status(204).send();
    } catch(err) {
        next(err);
    }
});

module.exports = myFavRouter;