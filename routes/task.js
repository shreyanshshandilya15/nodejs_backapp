import Express from "express";
import {
     createtask, 
     deletetask,
     getmytask,
      updatetask
    } 
from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=Express.Router();

router.post("/new",isAuthenticated,createtask);
router.get("/my",isAuthenticated,getmytask);

router.route("/:id")
.put(isAuthenticated,updatetask)
.delete(isAuthenticated,deletetask);

export default router;