const Sequelize = require('sequelize');
const sequelize = require('../boostraps/mysqlConnection');
const userModel = require('./users');
const roleModel = require('./roles');
const departmentModel = require('./department');
const categoryModel = require('./category');
const termModel = require('./academic_year')
const ideaModel = require('./idea');
const ideaCommentModel = require('./idea_comments');
const ideaDocumentModel = require('./idea_documents');
const ideaVoteModel = require('./idea_votes');
const aggrementModel = require('./aggrement');
const viewModel = require('./user_view');

const Role = roleModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const Department = departmentModel(sequelize, Sequelize);
const Term = termModel(sequelize, Sequelize);
const Idea = ideaModel(sequelize, Sequelize);
const IdeaComment = ideaCommentModel(sequelize, Sequelize);
const IdeaVote = ideaVoteModel(sequelize, Sequelize);
const IdeaDocument = ideaDocumentModel(sequelize, Sequelize);
const Aggrement = aggrementModel(sequelize, Sequelize);
const View = viewModel(sequelize,Sequelize);


User.hasMany(Department, { as: 'departments', foreignKey: 'manager_id', sourceKey: 'user_id'});
User.hasMany(Category, { as: 'categories', foreignKey: 'staff_id', sourceKey: 'user_id'});

Department.hasMany(Category, { as: 'department_categories', foreignKey: 'department_id', sourceKey: 'department_id'});
Idea.belongsTo(Department, {foreignKey: 'department_id'}); // Adds fk_company to User
// User.belongsTo(Department, {foreignKey: 'manager_id'}); // Adds fk_company to User

Idea.belongsTo(Term, {foreignKey: 'term_id'}); // Adds fk_company to User
Idea.belongsTo(Category, {foreignKey: 'category_id'}); // Adds fk_company to User
Idea.belongsTo(User, {foreignKey: 'user_id'}); // Adds fk_company to User
View.belongsTo(Idea, {foreignKey: 'idea_id'});

IdeaComment.belongsTo(User, {foreignKey: 'user_id'}); // Adds fk_company to User

Role.hasMany(User, { as: 'users', foreignKey: 'role_id', sourceKey: 'role_id' });
Idea.hasMany(IdeaComment, { as: 'comments',  foreignKey: 'idea_id', sourceKey: 'idea_id'});
Idea.hasMany(IdeaVote, { as: 'votes',  foreignKey: 'idea_id', sourceKey: 'idea_id'});
Idea.hasMany(IdeaDocument, { as: 'documents',  foreignKey: 'idea_id', sourceKey: 'idea_id'});

module.exports = {
  Role,
  User,
  Department,
  Category,
  Term,
  Idea,
  IdeaComment,
  IdeaDocument,
  IdeaVote,
  Aggrement,
  View,
}
