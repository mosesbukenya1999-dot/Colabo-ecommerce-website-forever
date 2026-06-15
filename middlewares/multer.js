/* // middlewares/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products", // all images go here
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload; */


/*

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "misc";

    // 🛍 product images
    if (req.baseUrl.includes("product")) {
      folder = "products";
    }

    // 📄 seller documents (ID, license)
    if (req.baseUrl.includes("seller")) {
      folder = "seller-docs";
    }

    // 👤 profile images (optional future use)
    if (req.baseUrl.includes("user")) {
      folder = "profiles";
    }

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    };
  },
});


 */

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "misc";

    if (file.fieldname === "nationalId") {
      folder = "seller-docs";
    }

    if (file.fieldname === "businessLicense") {
      folder = "seller-docs";
    }

    if (file.fieldname === "storeLogo") {
      folder = "store-logos";
    }

    if (file.fieldname === "storeBanner") {
      folder = "store-banners";
    }

    if (req.baseUrl.includes("product")) {
      folder = "products";
    }

    if (req.baseUrl.includes("user")) {
      folder = "profiles";
    }

    return {
      folder,
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "pdf",
      ],
    };
  },
});

const upload = multer({ storage });


export default upload;