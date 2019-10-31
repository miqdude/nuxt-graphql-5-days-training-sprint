const Sequelize = require("sequelize")
const db = require('./database')

var Menus = db.define('menus',{
    menu_id:{
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    cake_id: {
        type:Sequelize.INTEGER(),
        allowNull:false
    },
    batter_id:{
        type:Sequelize.INTEGER(),
        allowNull:false
    },
    topping_id:{
        type:Sequelize.INTEGER(),
        allowNull:false
    }
})

module.exports = Menus