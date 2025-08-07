import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Dynamic folder based on fieldname
export const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = 'default';
    if (file.fieldname === 'image') folder = 'images';
    else if (file.fieldname === 'video') folder = 'videos';

    return {
      folder,
      resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'webm'],
    };
  },
});
