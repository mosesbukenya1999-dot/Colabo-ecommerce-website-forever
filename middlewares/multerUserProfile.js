// middlewares/multerProfile.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Cloudinary storage for user profile images
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user-profiles", // separate folder for profile images
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadProfile = multer({ storage: profileStorage });

export default uploadProfile;