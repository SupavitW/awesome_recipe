require('dotenv-extended').load();

// Import sequelize object
const { Sequelize } = require('sequelize');

// Instantiate  sequelize instance
// eslint-disable-next-line no-undef
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection
      rejectUnauthorized: false // Allow self-signed certificates
    }
  },
  define: {
    timestamps: false, 
    freezeTableName: true
  }
});

// Setup db object to include sequelize(object), Sequelize(class), and all models
const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Users: require("./users")(sequelize, Sequelize),
  Recipes: require("./recipes")(sequelize, Sequelize),
  Recipe_pics: require('./recipe_pics')(sequelize, Sequelize),
  Shopping_List: require('./shopping_list')(sequelize, Sequelize),
  Ingredients: require('./ingredients')(sequelize, Sequelize)
};

const { Users, Recipes, Recipe_pics, Shopping_List, Ingredients } = db;

// Relations Setup
// One user - many created recipes
Users.hasMany(Recipes, {foreignKey: 'created_by_user'});
Recipes.belongsTo(Users, {foreignKey: 'created_by_user'}); 

// Many users - Many fav recipes 
Users_recipes_fav =  sequelize.define('users_recipes_fav', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users, 
      key: 'id'
    },
    allowNull: false
  },
  recipe_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Recipes,
      key: 'id'
    },
    allowNull: false
  }
});
Users.belongsToMany(Recipes, { through: Users_recipes_fav, foreignKey: 'user_id',  as: 'FavoriteRecipes'});
Recipes.belongsToMany(Users, { through: Users_recipes_fav, foreignKey: 'recipe_id', as: 'FavoritedBy' });

// One user - One shopping list
Users.hasOne(Shopping_List, {
  foreignKey: 'user_id',
  allowNull: false,
  onDelete: 'CASCADE',
});
Shopping_List.belongsTo(Users, {
  foreignKey: 'user_id',
  allowNull: false,
  onDelete: 'CASCADE',
});

// One recipe - One recipe_pic
Recipes.hasOne(Recipe_pics, {
  foreignKey: 'recipe_id',
  allowNull: false,
  onDelete: 'CASCADE',
});
Recipe_pics.belongsTo(Recipes, {
  foreignKey: 'recipe_id',
  allowNull: false,
  onDelete: 'CASCADE',
});


// Many recipes - Many ingredients
Recipes_ingredients = sequelize.define('recipes_ingredients', {
  recipe_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Recipes,
      key: 'id'
    },
    allowNull: false
  },
  ingredient_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Ingredients,
      key: 'id'
    },
    allowNull: false
  },
  unit: { type: Sequelize.STRING(50), allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false }
});
Recipes.belongsToMany(Ingredients, { through: Recipes_ingredients, foreignKey: 'recipe_id', 
                                    onDelete: 'CASCADE'});
Ingredients.belongsToMany(Recipes, { through: Recipes_ingredients, foreignKey: 'ingredient_id', 
                                    onDelete: 'CASCADE'});

// Many Shopping list - Many ingredients
Shopping_lists_ingredients = sequelize.define('shopping_lists_ingredients', {
  shopping_list_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Shopping_List,
      key: 'id'
    },
    allowNull: false
  },
  ingredient_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Ingredients,
      key: 'id'
    },
    allowNull: false
  },
  unit: { type: Sequelize.STRING(50), allowNull: false },
  quantity: { type: Sequelize.DOUBLE, allowNull: false}
});
Shopping_List.belongsToMany(Ingredients, { through: Shopping_lists_ingredients, foreignKey: 'shopping_list_id'});
Ingredients.belongsToMany(Shopping_List, { through: Shopping_lists_ingredients, foreignKey: 'ingredient_id'});

module.exports = db;
