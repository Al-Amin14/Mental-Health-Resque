const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const vlogspost=mongoose.Schema({
    vlogcontent:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"users"
    },
    likes:[
        {
            type:ObjectId,
            ref:"users"
        }
    ],
},{
    timestamps:true
})

module.exports = mongoose.model("vlogs",vlogspost)