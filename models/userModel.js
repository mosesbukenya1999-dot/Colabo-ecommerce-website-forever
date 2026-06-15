/* import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    cartData: {
        type: Object,
        default: {}
    },

    profilePic: {
        type: String, // URL of the uploaded profile picture
        default: ""   // optional: can be empty if user doesn’t upload
    }

}, { minimize: false, timestamps: true }); // timestamps optional, but useful

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel; */


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    cartData: {
      type: Object,
      default: {},
    },

    profilePic: {
      type: String,
      default: "",
    },

    // 🔥 SINGLE SOURCE OF TRUTH FOR ACCESS CONTROL
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;