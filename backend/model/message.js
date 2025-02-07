const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const messagemodel= mongoose.Schema({
    sender: {type:ObjectId,ref:"users"},
    message:{type:String,trim:true},
    chat:{ type:ObjectId , ref:"chat"},
},{
    timestamps:true
});
    
module.exports=mongoose.model("message",messagemodel)