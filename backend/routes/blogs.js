const express =require('express')
const mongoose=require('mongoose')
const users=require('../model/signUp') 
const handleusers =require('../middleware/handleusers')
const bloging=require('../model/postvlogs')

const routes=express.Router()


routes.post('/blogspost',handleusers, (req,res)=>{
    
    try{

        bloging.findOne({vlogcontent:req.body.content}).then((result)=>{
            if(!result){
                bloging.create({ vlogcontent: req.body.content, user: req.user._id }).then(resulting=>{
                    res.json(resulting)
                })
            }else{
                res.json({error:"Post Already Created"})
            }
        }).catch(error=>{
            res.status(422).json({error:"There is server issue"})
        })   
    }catch(error){
        res.json({error:"logout"})
    }

})

routes.get('/getblogspost', async   (req,res)=>{
    const alblogs=await bloging.find().populate("user","-password").sort({createdAt:-1})
    res.json(alblogs)
})

routes.get('/myreactpost',handleusers,async(req,res)=>{
    const myreactpost=await bloging.find({likes:{$in:req.user._id }}).populate("user","-password").sort({updatedAt:-1})
    res.json(myreactpost)

})

routes.put('/likePost',handleusers,(req,res)=>{

    console.log(req.body.postid)

    bloging.findByIdAndUpdate(
        req.body.postid,
        {
            $push:{likes:req.user._id}
        },{ 
            new:true
        }
    ).populate("user","-password").populate("likes").then((result)=>{
        res.json(result)
    }).catch(error=>{
        res.status(422).json({error:"There is a issuse in like"})
    })
})



routes.put('/unlikePost',handleusers,(req,res)=>{

    console.log(req.body.postid)

    bloging.findByIdAndUpdate(
        req.body.postid,
        {
            $pull:{likes:req.user._id}
        },{ 
            new:true
        }
    ).populate("user","-password").populate("likes").then((result)=>{
        res.json(result)
    }).catch(error=>{
        res.status(422).json({error:"There is a issuse in like"})
    })
})


module.exports=routes