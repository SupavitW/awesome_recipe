module.exports = ( sequelize , Sequelize ) => {
    const Recipe_pics = sequelize.define('recipe_pics', {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          imageType: {type: Sequelize.STRING, allowNull: false},
          imageName:{type: Sequelize.STRING, allowNull: false},
          imageData: {type: Sequelize.BLOB('long'), allowNull: false},
      }
    );    
    return Recipe_pics;
};