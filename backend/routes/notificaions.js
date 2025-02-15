const express=require('express')
const routes=express.Router()
const mongoose =require('mongoose')
const chat=require('../model/chated')
const message=require('../model/message')
const notification=require('../model/notifications')
const users=require('../model/signUp') 
const handleusers = require('../middleware/handleusers')


routes.get('/allnotification',handleusers,(req,res)=>{
    notification.find({tosend:{$in:req.user._id}}).sort({createdAt:-1}).then(result=>{
        res.json(result)
    }).catch(error=>{
        req.json({error:"There is a problem"})
    })
})


routes.post('/createNotification',async (req,res)=>{

    const {content,chat,sender,tosend}=req.body
    console.log(tosend)

    if(!content || !chat || !sender || !tosend){
        console.log("NOT WOrking..........")
        return res.json({error:"There is issue"})
    }
    var allusers= JSON.parse(req.body.tosend);


  notification.findOne({chat:chat}).then(result=>{

    if(!result){

        notification.create({
            content:content,
        chat:chat,
            sender:sender,
            tosend:allusers
        }).then(resulting=>{
            res.json(resulting)
        }).catch(error=>{
            console.log("error")
    console.log(error)

            res.json({error:"There is a problem1"})
        })

    }else{

        notification.find({
            $and: [{ chat: chat }, { content: content }]
          }).then(resultfind=>{

            
            if(resultfind.length==0){
                notification.findByIdAndUpdate(
                    result._id,
                    {
                      $set: { content:content },
                    },
                    {
                      new: true,
                    }
                  ).then(result=>{
                    res.json(result)
                }).catch(error=>{
                    console.log(error)
                    res.json({error:"There is a error2"})
                })

            }else{
                console.log(result)
                res.json(result)
            }
        }).catch(error=>{
    console.log(error)

            res.json({error:"There is a problem4"
            })
        })
       }

  }).catch(error=>{
    console.log(error)
    res.json({error:"This have to be fixed5"})
  })

    
})




module.exports=routes