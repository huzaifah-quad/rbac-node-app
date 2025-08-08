// RoleFunction.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("RoleFunction", {
    role_id: DataTypes.INTEGER,
    function_id: DataTypes.INTEGER
  });
};
