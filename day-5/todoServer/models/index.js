const TodoDtype = require('./Todo')
// const TodoDB = require('../databases/pgConnection')
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

const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    description:"Root Mutation",
    fields:()=>({
        addTodo:{
            type:TodoDtype,
            description:"Add new Todo",
            args:{
                title:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve:async (parent,args)=>{
                const newTodo = {
                    title : args.title
                }
                console.log(args.title)
                const res = await db.Todos.create(newTodo)
                console.log(res)
                return res.dataValues
            }
        },
        deleteTodo:{
            type:GraphQLInt,
            description:'Delete todo with id',
            args:{
                id:{type:GraphQLNonNull(GraphQLInt)}
            },
            resolve:async(parent,args)=>{
                const res = await db.Todos.destroy({
                    where:{
                        id : args.id
                    }
                })
                console.log(res)
                return res
            }
        }
    })
})

const schema = new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
})

module.exports = schema