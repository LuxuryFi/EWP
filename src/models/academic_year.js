module.exports = (sequelize, type) => sequelize.define('academic_years', {
    term_id: {
        type: type.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false,
      },
    term_name: {
      type: type.STRING, allowNull: false,
    },
    start_date: { type: type.DATE, allowNull: true,  },
    end_date: { type: type.DATE, allowNull: true,  },
    first_closure_date: { type: type.DATE, allowNull: true,  },
    final_closure_date: { type: type.DATE, allowNull: true,  },
    status: { type: type.BOOLEAN, allowNull: false },
});