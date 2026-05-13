import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check missing fields
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing user
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Use a strong password"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Create token
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = async (req,res)=>{
    try {
        
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = createToken(user._id);
                res.json({success:true, token})
            }else{
                res.json({success:false, message:"Wrong Password"})
            }
        }else{
            res.json({success:false,message: "Wrong Email Id"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const adminLogin = async (req,res)=>{
    try {
        
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export { registerUser, loginUser, adminLogin}