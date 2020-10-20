const {edit_profile}=require('../controllers/usersController')
const express=require('express');
const router=express.Router();

router.get('/:id',(req,res)=>{
    //check if it is his profile then show edit button
    
    
})
////show edit profile page
router.get('/edit/:id',(req,res)=>{
///get the edit home page with the old info
})
//////send the update request for the profile
router.patch('/edit/:id',edit_profile)


module.exports=router