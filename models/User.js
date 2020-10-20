const mongoose=require('mongoose');
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String
        ,required:true
        ,validate:[isEmail,'Enter a valid email']
        ,unique:[true,'email is taken']
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        default:'member'
    }
})

userSchema.pre('save',async function (next){
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    if(this.email=='obei.m2017@gmail.com'){
        this.role='admin'
    }
  
    
    
    next();
},{Timestamps:true})


const User=mongoose.model('users',userSchema)
module.exports={User}