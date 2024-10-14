import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import Jwt  from "jsonwebtoken";
import { sendcookie } from "../utils/features.js";
import Errorhandler from "../middlewares/error.js";

export const login=async(req,res,next)=>{
      try{
        const {email,password}=req.body;
        const user=await User.findOne({email}).select("+password");
        
        if(!user) return next(new Errorhandler("User does not exist.please register yourself !",404));
         const isMatch=await bcrypt.compare(password,user.password);
         
        if(!isMatch)return next(new Errorhandler("Incorrect email or password",404));
        sendcookie(user,res,`Welcome Back, ${user.name}`,201);
      }catch(error){
           next(error);
      }
};

export const addNewUser=async (req,res,next)=>{
       try{
        const {name,email,password}=req.body;
        let user= await User.findOne({email});
        if(user)return next(new Errorhandler("User already exists",404));
       
        const hashedpassword=await bcrypt.hash(password,10);
        user=await User.create({name,email,password:hashedpassword});
        
        sendcookie(user,res,"registered successfully!",201);
       }catch(error){
        next(error);
       }
};  

export const getmyprofile=(req,res)=>{
    
    // const user=await User.findById({id});
    res.status(200).json({
        success:true,
        user:req.user,
    });    
};

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true,
        samesite:process.env.NODE_ENV==="Development" ? "lax" :"none" ,
        secure: process.env.NODE_ENV=== "Development" ? false :true,
    }).json({
        success:true,
        user:req.user
    }); 
}

export const updateUser=async (req,res)=>{
    //req.params is used when you are trying to Access data by putting data as input
    
    const {id}=req.params;
    // console.log(req.params);
    const user= await User.findById(id);

    //this method is not really recommended
    // const {id}=req.body;
    // const user= await User.findById(id);

    res.json({
        success:true,
        message:"updated",
    });
};

export const deleteUser=async (req,res)=>{
    //req.params is used when you are trying to Access data by putting data as input
    
    const {id}=req.params;
    // console.log(req.params);
    const user= await User.findById(id);

    //this method is not really recommended
    // const {id}=req.body;
    // const user= await User.findById(id);

    res.json({
        success:true,
        message:"deleted",
    });
};