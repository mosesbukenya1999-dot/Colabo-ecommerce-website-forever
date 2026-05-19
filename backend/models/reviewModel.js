import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    productId: {
        type: String,
        required: true,
    },

    userName: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

},{timestamps:true});


const reviewModel = mongoose.models.reviews || mongoose.model("review", reviewSchema);

export default reviewModel;

// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//     rating: { type: Number, required: true },
//     text: { type: String, required: true },
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
// }, { timestamps: true });

// export default mongoose.model("review", reviewSchema);