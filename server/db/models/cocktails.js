const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('cocktails', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  directions: {
    type: Sequelize.TEXT,
  },
});
