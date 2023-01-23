const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/////////////////////////
//Create Router
/////////////////////////
const router = express.Router()

router.post('/signup', async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //make new user in db
    User.create(req.body, (err,user) => {
        res.redirect('/')
    })
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
                res.redirect('/')
            } else {
                //WOULD THIS WORK?!
                res.send('wrong password')
            }
        }
    })
})

router.get("/logout", (req,res)=>{
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

module.exports = router