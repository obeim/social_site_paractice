const mongoose=require('mongoose');


const messageSchema=mongoose.Schema({
    sender_id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    reciver_id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    content:{
        type:String,
        required:true
    }
})

const Message=mongoose.model('messages',messageSchema)

module.exports={Message};