import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";


const addReview = async(req,res)=> {
    try {
        
        const {rating,text, productId} = req.body;

        const userId = req.user.id;

        if (!userId) {
            return res.json({success:false, message: "User not Found"})
        };

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({success:false, message: "User does not exist"})
        }

        const reviewData = {
            rating,
            text,
            userName: user.name,
            productId,
            userId
        };

        const newReviews = new reviewModel(reviewData);

        await newReviews.save();

        res.json({success: true, message: "Review Submitted"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

const getReviews = async(req,res)=> {
    try {

        const {productId} = req.params;
        
        const reviews = await reviewModel.find({productId});

        res.json({success:true, reviews})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export { addReview, getReviews}