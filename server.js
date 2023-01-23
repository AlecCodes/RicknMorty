const express = require('express')
const PORT = process.env.PORT || 4000
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const DATABASE_URL = process.env.DATABASE_URL
const cors = require('cors')
const rmRouter = require('./controllers/rmapp')


/////////////////////////////
//MIDDLEWARE
/////////////////////////////
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/characters', rmRouter)


//Landing route
app.get('/',(req,res)=>{
    res.json({message: "WUB A LUBDUBDBU"})
})

//listener
app.listen(PORT, ()=>console.log(`TURNING UP ON PORT ${PORT}`))