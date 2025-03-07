const express=require('express')
const routes=express.Router()
const users=require('../model/signUp')
const chats=require('../model/chated')
const Message=require('../model/message')
const handleusers = require('../middleware/handleusers')
const  {getReceiverId}  = require('../app')


routes.post ('/sendmessage',handleusers,async (req,res)=>{

    const {content,chatid}=req.body
    if(!content || !chatid){
        return res.status(422).json({error:"Please provide message"})
    }


    var messages={
        sender:req.user._id,
        message:content,
        chat:chatid
    }

    try{

        messages=await Message.create(messages)
        messages = await messages.populate("sender","fullname email")
        messages = await messages.populate("chat","")
        messages= await users.populate(messages,{
            path:"chat.users",
            select:"fullname email"
        })
        await chats.findByIdAndUpdate(chatid,{
            latestmessage:messages
        })

        // const receiverSocktid=getReceiverId(chatid);
        // if(receiverSocktid){
        //     io.to(receiverSocktid).emit("newMessage",messages)
        // }

        res.json(messages)
    }catch(error){
        console.log(error)
        res.status(422).json({error:"There is a problem"})
    }
})

routes.get('/:chatid',handleusers,(req,res)=>{

    Message.find({chat:req.params.chatid}).populate("sender","fullname email").populate("chat","").then(result=>{
            res.json(result)
        }).catch(error=>{
            res.status(422).json({error:"There is a problem"})
        })

})

module.exports=routes