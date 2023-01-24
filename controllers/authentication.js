const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/////////////////////////
//Create Router
/////////////////////////
const router = express.Router()

router.get('/', (req,res)=>{
    res.json({message: "you have hit the home route of our router for user authentication. try /signup or /login or /logout"})
})

router.get('/username', async(req,res)=>{
    res.json({username: req.session.username})
})

router.post('/signup', async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //make new user in db
    User.create(req.body)
})

router.post('/login', async(req,res)=>{
    const{username,password} = req.body;
    User.findOne({username},(err,user)=>{
        if(!user){
            //WOULD THIS WORK ON A REACT APP????
            res.send('user doesnt exist')
        }else{
            const result = bcrypt.compareSync(password, user.password)
            if(result){
                req.session.username = username
                req.session.loggedIn = true
            } else {
                //WOULD THIS WORK?!
                res.send('wrong password')
            }
        }
    })
})

router.get("/logout", (req,res)=>{
    req.session.destroy()
})

module.exports = router