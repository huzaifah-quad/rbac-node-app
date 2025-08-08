// src/models/index.js
const db={};
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

console.log('Connecting to database...');
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`User: ${process.env.DB_USER}`);  
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);

const User = require('./User')(sequelize, DataTypes);
const Role = require('./Role')(sequelize, DataTypes);
const Function = require('./Function')(sequelize, DataTypes);
const UserRole = require('./UserRole')(sequelize, DataTypes);
const RoleFunction = require('./RoleFunction')(sequelize, DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = {
  sequelize,
  Sequelize,
  Function,
  User,
  Role,
  UserRole,
  RoleFunction,
  db
};
