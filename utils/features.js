import Jwt  from "jsonwebtoken";

export const sendcookie= (user,res,message,statusCode)=>{
    const token=Jwt.sign({_id:user._id},process.env.JWT_SECRET);
       
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        samesite:process.env.NODE_ENV==="Development" ? "lax" :"none" ,
        secure: process.env.NODE_ENV==="Development" ? false :true,
    })
    .status(200).json({
     success:true,
     message
    });
};