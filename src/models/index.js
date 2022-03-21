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

const Role = roleModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const Department = departmentModel(sequelize, Sequelize);
const Term = termModel(sequelize, Sequelize);
const Idea = ideaModel(sequelize, Sequelize);
const IdeaComment = ideaCommentModel(sequelize, Sequelize);
const ideaVote = ideaVoteModel(sequelize, Sequelize);
const ideaDocument = ideaDocumentModel(sequelize, Sequelize);

User.hasMany(Department, { as: 'departments', foreignKey: 'manager_id', sourceKey: 'user_id'});
User.hasMany(Category, { as: 'categories', foreignKey: 'staff_id', sourceKey: 'user_id'});

Department.hasMany(Category, { as: 'department_categories', foreignKey: 'department_id', sourceKey: 'department_id'});
Role.hasMany(User, { as: 'users', foreignKey: 'role_id', sourceKey: 'role_id' });
Idea.hasMany(IdeaComment, { as: 'comments',  foreignKey: 'idea_id', sourceKey: 'idea_id'});
Idea.hasMany(ideaVote, { as: 'votes',  foreignKey: 'idea_id', sourceKey: 'idea_id'});
Idea.hasMany(ideaDocument, { as: 'documents',  foreignKey: 'idea_id', sourceKey: 'idea_id'});

module.exports = {
  Role,
  User,
  Department,
  Category,
  Term,
  Idea,
  IdeaComment,
  ideaDocument,
  ideaVote,
}
