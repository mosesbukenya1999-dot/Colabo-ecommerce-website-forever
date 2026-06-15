import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  brand: String,
  category: String,
  subCategory: String,
  bestseller: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },

  // -------------------
  // NEW VARIANTS FIELD
  variants: [
    {
      size: { type: String }, // keep for compatibility
  
      label: { type: String }, // NEW
  
      price: {
        type: Number,
        required: true,
      },
  
      stock: {
        type: Number,
        default: 0,
      },
    },
  ],

  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
  
      review: {
        type: String,
        default: "",
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  averageRating: {
    type: Number,
    default: 0,
  },
  
  ratingCount: {
    type: Number,
    default: 0,
  },
  
  totalSold: {
    type: Number,
    default: 0,
  },

  sellerApplicationId: { type: mongoose.Schema.Types.ObjectId, ref: "SellerApplication" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: String,
});

export default mongoose.model("Product", productSchema);