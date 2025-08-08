module.exports = (sequelize, DataTypes) => {
  const Function = sequelize.define("Function", {
    function_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    function_name: DataTypes.STRING,
    function_url: DataTypes.STRING,
    function_icon: DataTypes.STRING,
    function_parent_id: DataTypes.INTEGER
  },{
    tableName: 'Functions', 
    timestamps: true       
  });

  Function.associate = models => {
    Function.belongsToMany(models.Role, {
      through: models.RoleFunction,
      foreignKey: 'function_id'
    });
  };

  return Function;
};
