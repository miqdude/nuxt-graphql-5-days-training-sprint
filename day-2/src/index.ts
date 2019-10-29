import * as express from 'express'

const app: express.Application = express()

app.get('/',(req,res)=>{
    res.sendFile("index.html",{root:__dirname},(err)=>{
        if(err){console.log(err)}
    })
})

app.listen(8080,function(){
    console.log("server running on 8080")
})