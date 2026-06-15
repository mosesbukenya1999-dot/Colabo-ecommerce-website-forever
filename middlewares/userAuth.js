import jwt from "jsonwebtoken";


const userAuth = async(req,res,next)=> {

    const {token} = req.headers;

    if (!token) {
        return res.json({success:false,message: "No Token Here"})
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {id: token_decode.id};

        next()
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export default userAuth;