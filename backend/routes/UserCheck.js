const express=require('express')
const routes=express.Router()
const mongoose=require('mongoose')
const handleusers = require('../middleware/handleusers')
const users=require('../model/signUp.js')

routes.get('/usersDetails',(req,res)=>{
    users.find().then(result=>{
        console.log(result)
        res.json(result)
    }).catch(error=>{
        console.log(error)
        res.json(error)
    })
})



module.exports=routes   