require('dotenv').config()

const jwt=require('jsonwebtoken')
const requireAuth=(req,res,next)=>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(err, decoded)=>{
            if(err){
                res.redirect('/login')
            }
            req.user=decoded;
            next();
        })
    }else{
        res.redirect('/login')
    }

}

module.exports={
    requireAuth
}