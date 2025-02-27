const express=require('express')
const routes=express.Router()
const mongoose =require('mongoose')
const chat=require('../model/chated')
const message=require('../model/message')
const notification=require('../model/notifications')
const users=require('../model/signUp') 
const handleusers = require('../middleware/handleusers')


routes.get('/allnotification',handleusers,(req,res)=>{
    notification.find({tosend:{$in:req.user._id}}).populate("sender","-password").sort({updatedAt:-1}).then(result=>{
        res.json(result)
    }).catch(error=>{
        req.json({error:"There is a problem"})
    })
})


routes.get('/allnotificationMy',handleusers,(req,res)=>{
    notification.find({$and: [{ chat: chat }, { content: content }]}).populate("sender","-password").sort({updatedAt:-1}).then(result=>{
        res.json(result)
    }).catch(error=>{
        req.json({error:"There is a problem"})
    })
})


routes.put('/updatenotification',(req,res)=>{
    notification.findByIdAndUpdate(req.body._id,
           {
            $set: { notify: true },
          },
          {
            new: true,
          }
    ).then(result=>{
        res.json(result)
    }).catch(error=>{
        res.status(422).json(error)
    })
})


routes.put('/updateItnotify',(req,res)=>{
    notification.findById(req.body._id).then(result=>{
        if(result && result.notify==true){
            notification.findByIdAndUpdate(req.body._id,
                {$set:{notify:false}},
                {new:true}
            ).then(result=>{
                res.json(result)
            }).catch(error=>{
                res.status(422).json(error)
            })
        }
    })
})




routes.post('/createNotification',async (req,res)=>{

    const {content,chat,sender,tosend}=req.body
    
    console.log(tosend)

    if(!content || !chat || !sender || !tosend){
        console.log("NOT WOrking..........")
        return res.json({error:"There is issue"})
    }
    var allusers=await JSON.parse(req.body.tosend);
    
    
  notification.findOne({chat:req.body.chat}).then((result)=>{
    
    if(!result){
        console.log(result)
        console.log("Why this happenedd------------------")
        
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
                    console.log(`Result 1 have been found ${resultfind}`)
                    res.json(result)
                }).catch(error=>{
                    console.log(error)
                    res.json({error:"There is a error2"})
                })

            }else{
                console.log(" ____is______ "+resultfind)
                res.json(resultfind)
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