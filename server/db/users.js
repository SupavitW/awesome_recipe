module.exports = ( sequelize , Sequelize ) => {
    const Users = sequelize.define('users', {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          username: { type: Sequelize.CHAR(6), allowNull: false, unique: true },
          password: { type: Sequelize.STRING(100), allowNull: false, },
          firstname: { type: Sequelize.STRING(50), allowNull: false},
          lastname: { type: Sequelize.STRING(50), allowNull: false}
      }
    );
    return Users;    
};

