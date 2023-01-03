const Sequelize = require('sequelize');
const sequelize = require('../database');

class Category extends Sequelize.Model {};
  
Category.init({
    name: Sequelize.STRING,
  }, {
    sequelize,
    tableName: "category"
  });
  
  
  module.exports = Category;