const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
    comment:[{
        user_id:{
            type:mongoose.SchemaTypes.ObjectId
        },
        body:{
            type:String,
            required:true
        }
    }]

})

const Post =mongoose.model('posts',postSchema)

module.exports={Post}