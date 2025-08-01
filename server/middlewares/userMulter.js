// middleware/multerMiddleware.js
import multer from "multer";
import { storage } from "../config/cloudinary.js"; // You already have this

const multerMiddleware = multer({ storage });

export default multerMiddleware;
