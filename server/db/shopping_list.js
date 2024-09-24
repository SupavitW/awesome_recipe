module.exports = ( sequelize , Sequelize ) => {
    const Shopping_List = sequelize.define('shopping_list', {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          title: { type: Sequelize.STRING(50), allowNull: false},
      }
    );
    return Shopping_List;
};