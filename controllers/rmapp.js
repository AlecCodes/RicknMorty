const express = require('express')
const Character = require('../models/character')

//////////////////////////
//Router
//////////////////////////
const router = express.Router()


//////////
//MIDDLEWARE FOR ROUTER - See Project 2 crm controller for ideas here
/////////

//////////////////////////
//Routes
//////////////////////////

//Index
router.get("/", async (req,res)=> {
    try {
        res.json(await Character.find({}))
    } catch (error){
        res.status(400).json(error)
    }
})

//Show
router.get("/:id", async(req,res)=>{
    try {
        res.json(await Character.findById(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})

//Create Route
router.post("/", async(req,res)=>{
    req.body.isFunny = req.body.isFunny === 'on' ? true : false;
    try{
        res.json(await Character.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})


//Delete route
router.delete("/:id", async(req,res)=>{
    try{
        res.json(await Character.findByIdAndDelete(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})

//Edit route
router.put("/:id", async(req,res)=>{
    try{
        res.json(await Character.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch(error){
        res.status(400).json(error)
    }
})

module.exports = router