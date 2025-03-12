import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = "image"; // Default to image

    if (file.mimetype.startsWith("video/")) {
      resourceType = "video"; // If it's a video, change resource type
    } else if (file.mimetype === "application/pdf") {
      resourceType = "raw"; // ✅ Cloudinary requires PDFs to be "raw"
    }

    return {
      folder: "college_details",
      resource_type: resourceType, // ✅ Supports images, videos, and PDFs
      allowed_formats: ["jpg", "png", "pdf", "mp4", "avi", "mov"], // ✅ Ensure "pdf" is included
    };
  },
});

const upload = multer({ storage });

export default upload;
