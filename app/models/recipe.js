const Sequelize = require('sequelize');
const sequelize = require('../database');

class Recipe extends Sequelize.Model {};
  
  Recipe.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,    
  }, {
    sequelize,
    tableName: "recipe"
  });
  
  
  module.exports = Recipe;