const express = require('express')
const session = require('express-session')
const PORT = process.env.PORT || 4000
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const DATABASE_URL = process.env.DATABASE_URL
const cors = require('cors')
const rmRouter = require('./controllers/rmapp')
const authRouter = require('./controllers/authentication')
const MongoStore = require('connect-mongo')


/////////////////////////////
//MIDDLEWARE
/////////////////////////////
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(session({
    secret: process.env.SECRET || 'bruh',
    store: MongoStore.create({mongoUrl:process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))

app.use('/characters', rmRouter)
app.use('/userAuth', authRouter)

//Landing route
app.get('/',(req,res)=>{
    res.json({message: "WUB A LUBDUBDBU you hit the '/' route of rick n morty API, is that what you meant to do? U prolly got redirected damn it morty"})
})

//listener
app.listen(PORT, ()=>console.log(`TURNING UP ON PORT ${PORT}`))