// UserRole.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserRole", {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  });
};
