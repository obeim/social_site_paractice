const mongoose=require('mongoose');

const reportSchema=mongoose.Schema({
    
    comment_id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    user_id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    content:{
        type:String,
        required:true
    }
})

const Report=mongoose.model('reports',reportSchema)

module.exports={Report}