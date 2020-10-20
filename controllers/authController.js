
const {User}=require('../models/User')
const _=require('lodash')
const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt =require('jsonwebtoken')
/////// login POST and GET , sign up POST and GET methods
const maxAge=1000 *60*60*24 
const createToken=function(payload){
   return jwt.sign(payload,process.env.SECRET,{expiresIn:maxAge})
}


const signup_post=async (req,res)=>{
    var body=_.pick(req.body,['email','password','name'])
    try{
    const user=await User.create(body)
    var id=user._id
    var role=user.role
    const token =createToken({id,role})
    res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000 }).send('logged in');
    }catch(err){
        res.status(400).send('email is taken')
    }
}
const login_post=(req,res)=>{
 var {email,password}=req.body;
 User.findOne({email},(err,user)=>{
     if(err){
         res.status(400).send(err)
     } 
     if(user){
         var id=user._id
         var role=user.role
         if(bcrypt.compare(password,user.password)){
          
            const token =createToken({id,role})
            res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000 }).send('logged in');
         }else{
             res.send('wrong password')
         }
     }else{
        res.status(400).send('user does not exsit')
     }
 })
}


const signup_get=(req,res)=>{
    res.send('signup')
}
const login_get=(req,res)=>{
 res.send('login')
}
const logout=(req,res)=>{
    res.cookie('jwt', '', {httpOnly:true, maxAge: 1 }).send('logged out');
    //then redirect to 
}
module.exports={
    signup_get
    ,signup_post
    ,logout
    ,login_get
    ,login_post
}