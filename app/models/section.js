const Sequelize = require('sequelize');
const sequelize = require('../database');

class Section extends Sequelize.Model {};
  
Section.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
  }, {
    sequelize,
    tableName: "section"
  });
  
  
  module.exports = Section;