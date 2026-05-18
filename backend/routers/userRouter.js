import express from "express";
import { adminLogin, getCurrentUser, loginUser, registerUser } from "../controllers/userController.js";
import uploadProfile from "../middlewares/multerUserProfile.js";

const userRouter = express.Router();

userRouter.post("/register", uploadProfile.single("profileImage"), registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", adminLogin)
userRouter.post("/me", getCurrentUser)

export default userRouter