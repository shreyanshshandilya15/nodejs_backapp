import Errorhandler from "../middlewares/error.js";
import { Task} from "../models/task.js";

export const createtask=async(req,res)=>{
      try{
        const {title,description}=req.body;
       
        await Task.create({
         title,
         description,
         user:req.user
        })
        
        res.status(201).json({
         success:true,
         message:"Task added successfully !"
        });
      }catch(error){
        next(error);
      }
};

export const getmytask=async(req,res)=>{
    try{
        const id=req.user._id;
    const tasks=await Task.find({user:id});

    res.status(200).json({
        success:true,
        tasks
    })
    }catch(error){
        next(error);
    }
};

export const updatetask=async(req,res,next)=>{
      try{
        const {id}=req.params;
        const task=await Task.findById(id);
     if(!task)return next(new Errorhandler("Invalid id",404));
     
        task.iscompleted =!task.iscompleted;
        await task.save();
        res.status(200).json({
         success:true,
         message:"task updated",
        })
      }catch(error){
        next(error);
      }
};

export const deletetask=async(req,res,next)=>{
   try{
    const {id}=req.params;
    const task=await Task.findById(id);

    if(!task) return next(new Errorhandler("User not found !",404));
    
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message:"task deleted"
    });

   }catch(error){
    next(error);
   }
};
