const express = require('express')
const PORT = process.env.PORT || 4000
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const DATABASE_URL = process.env.DATABASE_URL
const cors = require('cors')

////////////////////////
//CONNECTION
////////////////////////
const mongoose = require('mongoose')
const { Route } = require('react-router-dom')

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection
    .on("open", ()=> console.log("CONNECTED TO MONGOOSE"))
    .on("close", ()=> console.log("DISCONNECTED FROM MONGOOSE WTF"))
    .on("error", ()=>console.log(error))

//SCHEMA

const CharacterSchema = new mongoose.Schema({
    name: String,
    image: String,
    isFunny: Boolean
})

const Character = mongoose.model("character", CharacterSchema)


/////////////////////////////
//MIDDLEWARE
/////////////////////////////
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//ROUTES
//Home route
app.get("/", async (req,res) => {
    await res.json({message: "helloooooooooo"})
})

//Index Route
app.get("/characters", async (req,res)=> {
    try {
        res.json(await Character.find({}))
    } catch (error){
        res.status(400).json(error)
    }
})

//Create Route
app.post("/characters", async(req,res)=>{
    try{
        res.json(await Character.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})

//Put route
app.put("/characters/:id", async(req,res)=>{
    try{
        res.json(await Character.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch(error){
        res.status(400).json(error)
    }
})

//listener
app.listen(PORT, ()=>console.log(`TURNING UP ON PORT ${PORT}`))