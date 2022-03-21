const { IDEA_STATUS } = require('../configs/ms-constants');

module.exports = (sequelize, type) => sequelize.define('ideas', {
    idea_id: {
      type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
    },    
    user_id: {
      type: type.INTEGER, allowNull: false,
    },
    description: {
      type: type.TEXT, allowNull: true,
    },
    category_id: {
      type: type.INTEGER, allowNull: true,
    },
    term_id: {
      type: type.INTEGER, allowNull: true,
    },
    department_id: {
      type: type.INTEGER, allowNull: true,
    }, 
    status: {
      type: type.STRING(20), allowNull: false, defaultValue: IDEA_STATUS.FINAL_CLOSURE,
    }
}, {
  timestamps: false,
})