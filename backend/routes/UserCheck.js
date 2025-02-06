const express=require('express')
const routes=express.Router()
const mongoose=require('mongoose')
const handleusers = require('../middleware/handleusers')

routes.get('/usersDetails',handleusers,(req,res)=>{
    console.log(req.user)
    res.json(req.user)
})



module.exports=routes   