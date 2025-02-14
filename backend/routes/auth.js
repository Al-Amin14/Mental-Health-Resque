const express =require('express')
const routes=express.Router()
const mongoose=require('mongoose')
const users=require('../model/signUp.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')




routes.get('/',(req,res)=>{
    res.json({Success:"Greate api api ......"})
})

routes.post('/singup',async (req,res)=>{
    const {fullname, email,gender,age,password,role}=req.body
    console.log(req.body)
        await users.findOne({$or:[{email:email},{fullname:fullname}]}).then((saveUser)=>{
            if(saveUser){
                res.status(422).json({error:'User already exist'})
            }else{
                bcrypt.hash(password,12).then((hashpass)=>{
                    
                    users.create({
                        fullname:fullname,
                        email:email,
                        gender:gender,
                        age:age,
                        password:hashpass,
                        role:role,
                    }).then((user)=>{
                        res.json({success:"Your accound have been created"})
                    }).catch((err)=>{
                        console.log(err)
                        res.status(422).json({error:err})
                    })

                })  
            }
        }
        )
    }
),


routes.post('/singin',async (req,res)=>{

    const {email,password}= req.body

    if(!email || !password){
        res.status(422).json({error:"Enter all full details"})
    }else{

        users.findOne({email:email}).then(saveUsers=>{
            if(!saveUsers){
                res.status(422).json({error:"Enter valid email"})
        }else{
            bcrypt.compare(password,saveUsers.password).then(match=>{
                if(match){  
                    const token=jwt.sign({_id:saveUsers.id},process.env.jwt_secret)
                    const {_id}=saveUsers
                    const success="Successfully Loged in"
                    res.json({token,_id,success})
                }else{
                    res.status(422).json({error:"Invalid Password"})
                }
            })
        }
    })
            }

})




module.exports=routes;