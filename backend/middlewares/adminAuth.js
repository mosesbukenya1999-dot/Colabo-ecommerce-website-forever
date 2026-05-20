import jwt from "jsonwebtoken";


const adminAuth = async(req,res,next)=> {

        const {token} = req.headers;

        if (!token) {
            return res.json({success:false, message:"No Token Found"})
        }


    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:"No Match with the email and Password"})
        };

        next()
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}
export default adminAuth