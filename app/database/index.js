const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL,{
    define: {
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
});

sequelize.authenticate().then(() => console.log('ok')).catch((err) => console.log(err))
    

module.exports = sequelize;