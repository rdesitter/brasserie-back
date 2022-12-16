const Sequelize = require('sequelize');
const sequelize = require('../database');

class Carte extends Sequelize.Model {};
  
  Carte.init({
    name: Sequelize.STRING,
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },  
  }, {
    sequelize,
    tableName: "carte",
  });
  
  
  module.exports = Carte;