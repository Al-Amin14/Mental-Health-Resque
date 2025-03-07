const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const users=require('../model/signUp')

function handleusers(req,res,next){

    const {authorization}=req.headers

    if(!authorization){
        res.status(401).json({error:"Not Valid"})
    }else{
        const token=authorization.replace("Bearer ","")
        jwt.verify(token,process.env.jwt_secret,(err,payload)=>{
            if(err){
                res.status(401).json({error:"logout"})
            }else{
                const {_id}=payload
                users.findById(_id).then(saveUsers=>{
                    req.user=saveUsers
                    next()
                })
            }
        })
    }

}

module.exports=handleusers