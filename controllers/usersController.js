const User=require('../models/User')

const get_users=(req,res)=>{
    User.find({}).then(user=>{
        if(user){
            res.status(200).send(user)
        }else{
            res.status(404).send('there is no users')
        }
    }).catch(err=>{
        res.status(400).send(err)
    })
}
const delete_user=(req,res)=>{
    const id=req.params.id
    User.findByIdAndDelete(id,(err,user)=>{
        if(user){
            res.status(200).send(user)
        }else{
            res.status(404).send('user does not exist')
        }
        if(err){
            res.status(400).send(err)
        }
    })
}
module.exports={
    get_users,delete_user
}