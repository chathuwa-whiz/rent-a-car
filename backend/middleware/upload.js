import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../util/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rentacar", // Cloudinary folder
    format: async (req, file) => "png", // Convert all images to PNG
    public_id: (req, file) => file.originalname.split(".")[0], // Use original filename
  },
});

const upload = multer({ storage });

export default upload;
