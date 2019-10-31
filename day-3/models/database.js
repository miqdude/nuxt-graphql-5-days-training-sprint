const Sequelize = require('sequelize')

const DB = new Sequelize(
    "testkitabisa",
    "postgres",
    "postgres",{
        host:"localhost",
        dialect:'postgres',
        operatorAliases:false
    }
)

module.exports = DB