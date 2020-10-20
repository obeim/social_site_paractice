// show all posts , add post ,delete post , edit post ,
const {Post}=require('../models/Post')
const _=require('lodash');

const show_posts=async(req, res)=>{
      
    Post.find({}).then(doc=>{
       if(doc){
           res.status(200).send(doc)
       }else{
           res.send('there is no posts')
       }
     
    }).catch(err=>{
        res.status(404).send('not found')
    })
   
}

const add_post=async (req, res)=>{
    const body=_.pick(req.body,['title','body']);
    const post=await Post.create(body)
    if(post.title==body.title){
    res.status(200).send(post)
    }else{
        res.status(400).send('err could not create post')
    }
}

const edit_post=async (req, res)=>{
    const body=_.pick(req.body,['title','body'])
    const id=req.params.id
    Post.findByIdAndUpdate(id,{$set:body },{new:true,useFindAndModify:false}).then(doc=>{
        if(!doc){
            res.status(404).send('post does not exist')
        }else{
            res.status(200).send(doc)
        }
    }).catch(err=>{
        res.status(400).send(err)
    })
}

const delete_post=async (req, res)=>{
    const id=req.params.id;
    Post.findByIdAndDelete(id).then(post=>{
        if(!post){
            res.status(400).send('post does not exist')
        }else{
            res.status(200).send(post)
        }
    }).catch(err=>{
        res.status(400).send(err)
    })  
  }

  module.exports={
      show_posts,add_post,edit_post,delete_post
  }