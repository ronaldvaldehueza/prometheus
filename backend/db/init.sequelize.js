const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite',
  logging: false // optional: silences console logs
});

module.exports = sequelize;
