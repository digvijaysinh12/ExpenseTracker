import express from "express";
import authController from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userModel from "../models/userModel.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.get("/user",authMiddleware,async(req,res) => {
    try{
        const User = await userModel.findById(req.user.id).select("-password");
    }catch(error){
        res.status(500).json({message: "Failed to fetch User"});
    }
})
router.post("/login", authController.login);
router.post("/forgot-password",authController.forgotPassword);


router.post('/logout',(req,res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out'});
})

export default router;
