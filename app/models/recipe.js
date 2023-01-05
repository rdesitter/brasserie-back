const Sequelize = require('sequelize');
const sequelize = require('../database');

class Recipe extends Sequelize.Model {};
  
  Recipe.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.NUMBER,
  }, {
    sequelize,
    tableName: "recipe"
  });
  
  
  module.exports = Recipe;