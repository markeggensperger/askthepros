const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('tags', {
  tag: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
});
