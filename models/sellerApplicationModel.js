/* import mongoose from "mongoose";

const sellerApplicationSchema = new mongoose.Schema(
  {
    // 🔗 link to user account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // 👤 Personal Information
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    location: { type: String }, // city/country

    // 🏢 Business Information
    businessName: { type: String },
    businessType: {
      type: String,
      enum: ["individual", "small_business", "company", "manufacturer"],
      required: true,
    },

    // 🛍 Product Information
    productCategory: {
      type: String,
      enum: ["fashion", "electronics", "beauty", "home_living"],
      required: true,
    },

    productDescription: {
      type: String,
    },

    // 🏪 Store Information
    storeName: {
      type: String,
      required: true,
    },

    storeDescription: {
      type: String,
    },

    // 📄 Verification Documents
    nationalId: {
      type: String, // file URL
      required: true,
    },

    businessLicense: {
      type: String, // file URL (optional)
    },

    // ⚙️ Application status (VERY important)
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SellerApplication", sellerApplicationSchema); */


import mongoose from "mongoose";

const sellerApplicationSchema = new mongoose.Schema(
  {
    // 🔗 Linked User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // 👤 Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    // 🏢 Business Information
    businessName: {
      type: String,
      trim: true,
    },

    businessType: {
      type: String,
      enum: ["individual", "small_business", "company", "manufacturer"],
      required: true,
    },

    // 🛍 Product Information
    productCategory: {
      type: String,
      enum: [
        "fashion",
        "electronics",
        "beauty",
        "home_living",
        "grocery",
        "restaurant",
        "sports",
        "books",
        "other",
      ],
      required: true,
    },

    productDescription: {
      type: String,
      trim: true,
    },

    // 🏪 Store Information
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    storeDescription: {
      type: String,
      trim: true,
    },

    storeLogo: {
      type: String,
      default: "",
    },

    storeBanner: {
      type: String,
      default: "",
    },

    storeLocation: {
      type: String,
      trim: true,
    },

    // 📍 Future Nearby Stores Feature
    coordinates: {
      lat: {
        type: Number,
        default: null,
      },

      lng: {
        type: Number,
        default: null,
      },
    },

    // ⭐ Store Display Data
    storeRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    storeViews: {
      type: Number,
      default: 0,
    },

    // 👀 Show in Browse Stores
    isStoreVisible: {
      type: Boolean,
      default: false,
    },

    // 📄 Verification Documents
    nationalId: {
      type: String,
      required: true,
    },

    businessLicense: {
      type: String,
      default: "",
    },

    // ⚙️ Application Status
    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    // 👨‍💼 Admin Review
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SellerApplication",
  sellerApplicationSchema
);