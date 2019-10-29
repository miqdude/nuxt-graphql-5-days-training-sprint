import * as express from 'express'

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.sendFile('index.html',{root:__dirname},(err)=>{
        if(err){
          console.log(err)
        }
      })
    })
    this.express.use('/', router)

    router.get('/custom',(req,res)=>{
        res.send("Hello Miqdad")
    })
    this.express.use('/custom',router)
  }
}

export default new App().express