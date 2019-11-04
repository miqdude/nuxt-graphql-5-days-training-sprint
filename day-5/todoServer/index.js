const express = require('express')
const expressGraphql = require('express-graphql')

const schema = require('./models/index')

const app = express()

const port = 9000

app.use('/graphql',expressGraphql({
    schema:schema,
    graphiql:true
}))

app.listen(port, ()=>{console.log(`server running at locahost on port ${port}`)})