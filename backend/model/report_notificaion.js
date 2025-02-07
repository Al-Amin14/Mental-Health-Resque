const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.types


const report_notificationmodel=mongoose.Schema({

    text:{
        type:String,
        trim:true
    },
    usersend:{
        type:ObjectId,
        type:"user",
    },
    messageing:{
        type:ObjectId,
        type:"chat"
    }
},{
    timestamps:true
}
)

module.exports=mongoose.model('reports',report_notificationmodel)