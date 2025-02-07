const mongoose =require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const chatmodel=mongoose.Schema({
    chatname:{
        type:String,
        trim:true
    },
    isgrouphchat:{
        type:Boolean,
        default:false,
    },
    users:[{
        type:ObjectId,
        ref:"users"
    }],
    latestmessage:{
        type:ObjectId,
        ref:"message"
    },
    grouphadmin:{
        type:ObjectId,
        ref:"users"
    }
},{
    timestamps:true
});

module.exports=mongoose.model('chat',chatmodel

)
