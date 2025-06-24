import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,     // ✅ CORRECTED
  api_secret: process.env.CLOUD_SECRET, // ✅ CORRECTED
});

export default cloudinary;
