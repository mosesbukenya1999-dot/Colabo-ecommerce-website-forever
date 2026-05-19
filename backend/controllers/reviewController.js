import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";


const addReview = async (req, res) => {
    try {
        const { rating, text, productId } = req.body;
        const userId = req.user.id;

        if (!userId) return res.json({ success: false, message: "User not found" });

        const newReview = new reviewModel({ rating, text, productId, userId });
        await newReview.save();

        res.json({ success: true, message: "Review submitted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await reviewModel
            .find({ productId })
            .populate("userId", "name profilePic") // populate only name & profilePic
            .sort({ createdAt: -1 });

        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addReview, getReviews}