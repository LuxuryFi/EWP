const Sequelize = require('sequelize');
const sequelize = require('../boostraps/mysqlConnection');
const userModel = require('./users');
const roleModel = require('./roles');
const departmentModel = require('./department');
const categoryModel = require('./category');
const academicYearModel = require('./academic_year')

const Role = roleModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const Department = departmentModel(sequelize, Sequelize);
const AcademicYear = academicYearModel(sequelize, Sequelize);

User.hasMany(Department, { as: 'departments', foreignKey: 'user_id', sourceKey: 'user_id'});
User.hasMany(Category, { as: 'categories', foreignKey: 'user_id', sourceKey: 'user_id'});

Role.hasMany(User, { as: 'users', foreignKey: 'role_id', sourceKey: 'role_id' });


module.exports = {
  Role,
  User,
  Department,
  Category,
  AcademicYear,
}
