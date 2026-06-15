import { v2 as cloudinary } from "cloudinary";

// Direct configuration (NO .env used)
cloudinary.config({
  cloud_name: "dc37e9gv3",
  api_key: "792735229699891",
  api_secret: "Xrf50yZlKt6aOOVAv7kLZHwtpHg",
});

export default cloudinary;