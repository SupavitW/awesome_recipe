module.exports = ( sequelize , Sequelize ) => {
    const Recipes = sequelize.define('recipes', {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          title: { type: Sequelize.STRING(50), allowNull: false },
          description: { type: Sequelize.STRING(500), allowNull: false, },
          category: { type: Sequelize.STRING(50), allowNull: false},
          preparation_time: { type: Sequelize.STRING(20), allowNull: false},
          instructions: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false},
      }
    );
    return Recipes;  
};