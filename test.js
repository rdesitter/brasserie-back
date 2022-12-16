require("dotenv").config();

const sequelize = require("./app/database")

const Role = require("./app/models/role")

sequelize.authenticate().then(() => console.log('ok')).catch((err) => console.log(err))


Role.findAll().then(roles => {
    console.log(roles)
  })