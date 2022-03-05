const Sequelize = require('sequelize');
const sequelize = require('../boostraps/mysqlConnection');
const userModel = require('./users');
const roleModel = require('./roles');


const Role = roleModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

Role.hasMany(User, { as: 'users', foreignKey: 'role_id', sourceKey: 'role_id' });

module.exports = {
  Role,
  User,
}
