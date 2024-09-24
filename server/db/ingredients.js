module.exports = ( sequelize , Sequelize ) => {
    const Ingredients = sequelize.define('ingredients', {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          title: { type: Sequelize.STRING(50), allowNull: false}
      }
    );    
    return Ingredients;
};