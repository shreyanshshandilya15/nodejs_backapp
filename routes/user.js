import express from "express";
import { 
    addNewUser,
    getmyprofile,
    login,
    logout
} 
from "../controlers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

// router.get("/all",getAllUsers);

router.post("/new",addNewUser);
router.post("/login",login);
//dynamic routing
// router.get("/userid/special",specialfunc);

router.get("/me",isAuthenticated,getmyprofile);
router.get("/logout",logout);

// router.route("/userid/:id").get(getUser);
// .put(updateUser)
// .delete(deleteUser)

// router.get("/userid/:id",getUser);
// router.put("/userid/:id",updateUser);
// router.delete("/userid/:id",deleteUser);

export default router;