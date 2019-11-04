const express = require('express')
const expressGraphiql = require('express-graphql')
const TodoDB = require('../databases/pgConnection')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const TodoDtype = new GraphQLObjectType({
    name:"Todo",
    description:"Todo data type",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        title:{type:GraphQLNonNull(GraphQLString)}
    })
})

module.exports = TodoDtype