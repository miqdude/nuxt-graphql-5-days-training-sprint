const express = require('express')
const expressGraphiql = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

var users = [
    {id:1,name:"Bagas"},
    {id:2,name:"Miqdude"}
]

var todos = [
    {id:1,task:"Nothing",userid:1},
    {id:2,task:"Sleep",userid:1},
    {id:3,task:"Running",userid:2},
    {id:4,task:"Punching",userid:2}
]

const User = new GraphQLObjectType({
    name : "User",
    description:"Contains users",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        todos:{
            type:new GraphQLList(Todo),
            resolve:(user)=>{
                return todos.filter(t => t.userid === user.id)
            }
        }
    })
})

const Todo = new GraphQLObjectType({
    name : "Todo",
    description:"This is Todo",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        task:{type:GraphQLNonNull(GraphQLString)},
        userid:{type:GraphQLNonNull(GraphQLInt)},
        user:{
            type: User,
            resolve:(todo)=>{
                return users.find(u => todo.userid === u.id)
            }
        }
    })
})

const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    description:"Root Mutation",
    fields:()=>({
        addTodo:{
            type:Todo,
            description:"Add new Todo",
            args:{
                task:{type:GraphQLNonNull(GraphQLString)},
                userid:{type:GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent, args)=>{
                const t = {
                    id: todos.length+1,
                    task: args.task,
                    userid: args.userid
                }
                todos.push(t)
                return t
            }
        },
        deleteTodo:{
            type:GraphQLInt,
            description:"Delete Todo",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent, args)=>{
                let t = todos.find(el => el.id === args.id)
                const i = todos.indexOf(t)
                todos.splice(i,1)
                return i
            }
        },
        addUser:{
            type:User,
            description:"Add new User",
            args:{
                name:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent,args)=>{
                const u = {
                    id:users.length+1,
                    name:args.name
                }
                users.push(u)
                return u
            }
        },
        deleteUser:{
            type:GraphQLInt,
            description:"Delete User",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent, args)=>{
                let u = users.find(el => el.id === args.id)
                const i = users.indexOf(t)
                todos.splice(i,1)
                return i
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : "Query",
    description:"Root Query",
    fields:()=>({
        todos:{
            type : new GraphQLList(Todo),
            description : 'List of todos',
            resolve: ()=>todos
        },
        users:{
            type: new GraphQLList(User),
            description:"List of Users",
            resolve:()=>users
        },
        todo:{
            type:Todo,
            description:"Single Todo",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,args)=>{
                return todos.find(t => t.id === args.id)
            }
        },
        user:{
            type:User,
            description:"Single User",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,args)=>{
                return users.find(u => u.id === args.id)
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})


const app = express()

app.use('/graphiql',expressGraphiql({
    schema:schema,
    graphiql:false
}))
app.listen(8080,()=>{console.log("Server running on 8080")})