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

const allowedorigins=[
    'http://localhost:5173',
    'https://nodejs-todoapp-82rh.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
      // If the request origin is in the allowedOrigins list or if there's no origin (like in some tools)
      if (allowedorigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // Enable sending of credentials (cookies, auth headers)
};
app.use(cors(corsOptions));

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/task",taskRoutes);

app.get("/",(req,res)=>{
    res.send("working");
});

app.use(errormiddleware);
