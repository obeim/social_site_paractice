const express=require('express');
const router=express.Router();
////must be authenticated

router.post('/post/:id',(req,res)=>{
    //can add comment  here save it with user id
})
router.get('/post/:id',(req,res)=>{
    //show the post and the comments
    //when getting the post info check all the comment_user_id and compare it with the user to show delete and edit button
})
router.patch('/post/:id',(req,res)=>{
    //response to the delete button with the comment id
})
router.patch('/post/:id/editcomment',(req,res)=>{
    ///manage edit the comment request here
})