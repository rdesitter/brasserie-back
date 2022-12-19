require("dotenv").config();

const sequelize = require("./app/database")

const User = require("./app/models/user")

sequelize.authenticate().then(() => console.log('ok')).catch((err) => console.log(err))


User.findAll().then(user => {
    console.log(user)
  })