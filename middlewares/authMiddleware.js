require('dotenv').config()

const jwt=require('jsonwebtoken')
const requireAuth=(req,res,next)=>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(err, decoded)=>{
            if(err){
                res.send('you need to login again')
            }
            req.user=decoded;
            req.token=token;
            next();
        })
    }else{
        res.send('you need to login')
    }

}

module.exports={
    requireAuth
}