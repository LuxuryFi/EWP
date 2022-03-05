module.exports = (sequelize, type) => sequelize.define('users', {
  user_id: {
    type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
  },
  username: { type: type.STRING(30), allowNull: true },
  full_name: { type: type.STRING(30), allowNull: true },
  first_name: { type: type.STRING(15), allowNull: true },
  last_name: { type: type.STRING(15), allowNull: true },
  phone: { type: type.STRING(11), allowNull: true },
  avatar: { type: type.STRING(100), allowNull: true },
  password: { type: type.TEXT, allowNull: true },
  role_id: { type: type.INTEGER, allowNull: false },
  profile_status: { type: type.BOOLEAN, allowNull: false, defaultValue: 0 },
  created_date: { type: type.DATE, allowNull: true },
  updated_date: { type: type.DATE, allowNull: true },
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
