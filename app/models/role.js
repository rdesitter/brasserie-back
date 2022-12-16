const Sequelize = require('sequelize');
const sequelize = require('../database');

class Role extends Sequelize.Model {};
  
Role.init({
  name: Sequelize.STRING,
}, {
  sequelize,
  tableName: "role"
});
  
module.exports = Role;