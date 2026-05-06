import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: "ecommerce-products", // 👈 force folder creation
      resource_type: "image",
      format: "png", // optional but stabilizes uploads
    }),
  });

const upload = multer({ storage });

export default upload;