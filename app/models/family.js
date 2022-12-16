const Sequelize = require('sequelize');
const sequelize = require('../database');

class Family extends Sequelize.Model {};
  
  Family.init({
    name: Sequelize.STRING,
  }, {
    sequelize,
    tableName: "family"
  });
  
  
  module.exports = Family;