const mongoose=require('mongoose')
const { ObjectId }=mongoose.Schema.Types

const NotificationMode=mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    chat:{
        type:ObjectId,
        ref:"chat"
    },
    sender: {
        type:ObjectId,
        ref:"users"
    },
    tosend: [{
        type:ObjectId,
        ref:"users"
    }],
},{
    timestamps:true
})

module.exports=mongoose.model('notification',NotificationMode)
