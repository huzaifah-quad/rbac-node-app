// User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: DataTypes.STRING, unique: true },
    user_password: DataTypes.STRING,
    user_real_name: DataTypes.STRING
  });
  User.associate = (models) => {
    User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });
  };
  return User;
};
