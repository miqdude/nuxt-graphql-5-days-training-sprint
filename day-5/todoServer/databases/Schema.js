const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require("graphql")

const Model = require('../models/TodoModel')

const Todo = new GraphQLObjectType({
    name : "User",
    description : "Contains todo task",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        title:{type:GraphQLNonNull(GraphQLString)}
    })
})

const RootQuery = new GraphQLObjectType({
    name:"Query",
    description:"Root query",
    fields:()=>({
        todos:{
            type:new GraphQLList(Todo),
            description:"List of Todos",
            resolve:(parent,args)=>{
                return Model.findAll()
            }
        },
        todo:{
            type: Todo,
            description:"Single Todo",
            args:{
                id:{GraphQLInt}
            },
            resolve:(parent,args)=>{
                return Model.findByPk(args.id)
            }
        }
    })
})

module.exports = {RootQuery}