module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_name: DataTypes.STRING,
    role_desc: DataTypes.STRING
  });

  Role.associate = models => {
    // Many-to-Many: Role <-> Function
    Role.belongsToMany(models.Function, {
      through: models.RoleFunction,
      foreignKey: 'role_id'
    });

    // Many-to-Many: Role <-> User
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'role_id'
    });
  };

  return Role;
};
