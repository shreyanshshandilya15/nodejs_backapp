import mongoose from "mongoose";

const taskschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    iscompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const Task=new mongoose.model("Task",taskschema);