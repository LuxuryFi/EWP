module.exports = (sequelize, type) => sequelize.define('idea_votes', {
	vote_id: {
		type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
	}, 
	user_id: {
		type: type.INTEGER, allowNull: false,
	},
	vote: {
		type: type.TEXT, allowNull: true,
	},
	idea_id: {
		type: type.INTEGER, allowNull: true,
	},
	created_date: { type: type.DATE, allowNull: true, defaultValue: new Date()   },
	updated_date: { type: type.DATE, allowNull: true,  },
}, {
	timestamps: false,
});