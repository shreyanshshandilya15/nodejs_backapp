import express from "express";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
import taskRoutes from "./routes/task.js"
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app=express();

config({
    path:"./data/config.env"
})
//middleware exist in app only and databse connection in server

//middleware used to access data through postman
app.use(express.json());
//middleware to access cookies data
app.use(cookieParser());
//middleware to use router
app.use(
    cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.get("/",(req,res)=>{
    res.send("working");
});

app.use(errormiddleware);
