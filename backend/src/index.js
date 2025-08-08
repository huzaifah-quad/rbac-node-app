require('dotenv').config();
const express = require('express');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../docs/swagger-output.json');

const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const { User, Role, Function, UserRole, RoleFunction } = require('./models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST, dialect: 'postgres'
});
const app = express();
app.use(express.json());

// associate
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(Function, { through: RoleFunction, foreignKey: 'role_id' });
Function.belongsToMany(Role, { through: RoleFunction, foreignKey: 'function_id' });

const indexRouter = require('../routes/index');

app.use("/", indexRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(4000, () => console.log('Backend running on 4000'));

module.exports = app;