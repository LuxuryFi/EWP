module.exports = (sequelize, type) => sequelize.define('departments', {
  department_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  description: {
    type: type.TEXT, allowNull: false,
  },
  manager_id: {
    type: type.INTEGER, allowNull: false,
  },
  created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
  updated_date: { type: type.DATE, allowNull: true,  },
}, {
  timestamps: false,
  // hooks: {
  //   beforeBulkCreate: beforeBulkCreateHandler,
  //   beforeBulkUpdate: beforeBulkOtherHookHandler,
  //   beforeBulkDestroy: beforeBulkOtherHookHandler,
  //   afterCreate: afterHookHandler(HOOK_TYPE.CREATE),
  //   afterDestroy: afterHookHandler(HOOK_TYPE.DESTROY),
  //   afterUpdate: afterHookHandler(HOOK_TYPE.UPDATE),
  // },
});
