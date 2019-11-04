const Sequelize = require('sequelize')
const express = require('express')

const sequelize = new Sequelize(
    'arkanaTodo',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

const Todos = sequelize.define('todos',{
    id:{
        type:Sequelize.INTEGER(),
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    title:{
        type:Sequelize.STRING(),
        allowNull:false
    }
},{
    timestamps:false
})

module.exports = {Todos}

// const app = express()

// app.use('/',function(req,res){
//     Todos.findAll().then(p=>res.send(p))
// })

// sequelize.authenticate()
//     .then(()=>{
//         sequelize.sync().then(()=>{
//             app.listen(9000,() => console.log(`server running on 9000`))
//         })
//     })
//     .catch((err)=>{
//         console.log(err)
//     })