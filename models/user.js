import mongoose from "mongoose";

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

export const User= mongoose.model("User",userschema);
