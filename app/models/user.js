const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};
  
  User.init({
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    admin: Sequelize.BOOLEAN,
    active: Sequelize.BOOLEAN,
  }, {
    sequelize,
    tableName: "user",
  });
  
  
  module.exports = User;