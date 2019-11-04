const TodoDtype = require('./Todo')
const TodoDB = require('../databases/pgConnection')
const db = require('../databases/pgConnection')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const RootQuery = new GraphQLObjectType({
    name:"Query",
    description:"Root Query",
    fields:()=>({
        todos:{
            type:new GraphQLList(TodoDtype),
            description:"List of Todos",
            resolve:async function(){
                return await db.Todos.findAll()
            }
        }
    })    
})

const schema = new GraphQLSchema({
    query:RootQuery
})

module.exports = schema