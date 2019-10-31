const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'testkitabisa',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

sequelize.authenticate()
    .then(()=>console.log("dbcon success"))
    .catch((err)=>console.log(err))

const Menu = sequelize.define('menus',{
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
},{
    timestamps:false
})


var musics = [
    {id:1,title:"The Flaws In Our Stars",genre:"Galaw",year:2003},
    {id:2,title:"Fix My Night",genre:"Galaw",year:2018},
    {id:3,title:"You Are My Palletes", genre:"Galaw",year:2019}
]

var app = express();

// using cookie parser
app.use(cookieParser())

// using express session
app.use(session({secret:"it's our secret"}))

// add static file
app.use(express.static('images'))

// First middleware for any route
app.use(function(req,res,next){
    console.log("first called middleware")
    next()
})

// add bodyparser middleware
app.use(bodyParser.json())

app.get('/menus',function(req,res){
    Menu.findAll().then(menus=>{
        res.json(menus)
    })
})


app.get('/', function(req,res){
    
    console.log(req.body); // body parser
    
    if(req.cookies){ // show cookies
        console.log(req.cookies)
    }

    res.cookie( "name",
                "learn express js",
                {maxAge:60000}
    ).send('Hello world') // with send cookies
})

// url building with regex
app.get('/:id([0-9]{2})',function(req,res){
    res.clearCookie('name').send("requested id" + req.params.id)
})


// Create RESTful API

app.get('/musics',function(req,res){
    res.json(musics)
})

app.get("/musics/:id([0-9]{1,})",function(req,res){
    let filteredMusic = musics.filter(function(music){
        if(music.id == req.params.id){
            return true
        }
    })
    if(filteredMusic.length == 1){
        res.json(filteredMusic[0])
    }else{
        res.status(404)
        res.json({message:"Not Found"})
        res.end()
    }
})

app.post("/music/add", function(req,res){
    if(!req.body.title || !req.body.genre || !req.body.year
        || !req.body.year.toString().match(/^[0-9]{4}$/g)
        ){
            res.status(400)
            res.json({message:"Bad Request"})
        }
    else{
        let newId = musics[musics.length-1].id+1
        musics.push({
            id:newId,
            title:req.body.title,
            genre:req.body.genre,
            year:req.body.year
        })
        res.json({message:"New music"})
    }
})

app.post("/music/edit/:id([0-9]{1,})",function(req,res){
    if(!req.body.title || !req.body.genre
        || !req.body.year.toString().match(/^[0-9]{4}$/g)
        || !req.params.id.toString().match(/^[0-9]{1,}$/g) 
        )
        {
            res.status(400)
            res.json({message:"Bad Request"})
        }
    else{

        console.log(req.params.id)
        
        let filteredMusic = musics.filter(function(music){
            if(music.id == req.params.id){
                return true
            }
        })

        if(filteredMusic.length == 1){
            const findIndex = musics.indexOf(filteredMusic[0])
            console.log(filteredMusic)

           // update music
           musics[findIndex].title = req.body.title
           musics[findIndex].genre = req.body.genre
           musics[findIndex].year =  req.body.year
           
           res.json({message:"Music updated"})
        }else{
            res.status(404)
            res.json({message:"Editable music not found"})
            res.end()
        }
    }
})

app.post('/music/delete',function(req,res){
    
    if(!req.body.id.toString().match(/^[0-9]{1,}$/)){
        res.status(400)
        res.json({message:"Bad request"})
    }
    else{
        let deleteIndex = musics.map(function(elem){
            return elem.id
        }).indexOf(req.body.id)

        if(deleteIndex === -1){
            res.status(404)
            res.json({message:"Not found"})
        }else{
            musics.splice(deleteIndex,1)
            res.json({message:"music id "+req.body.id+" was deleted"})
        }
    }

})

// REST API Postgres

// app.get('/menus',db.getMenus)


// url for undefined route
app.get('*',function(req,res){
    if(req.session.viewed){
        req.session.viewed++
    }else{
        req.session.viewed = 1
    }

    res.send("not found, you've viewd this page "+req.session.viewed+" times")
})

app.listen(8080);