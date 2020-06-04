import dotenv from 'dotenv';

const cloudinary = require('cloudinary').v2;

dotenv.config();

export enum constantCloudinary {
  BASE64 = 'data:image/jpeg;base64',
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;
