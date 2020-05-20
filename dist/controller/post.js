"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class postController {
    async uploadPost(req, res) {
        const { _id, text, date, images } = req.body;
        try {
            await model_1.default.post.updateOne({ idUser: _id }, { idUser: _id, text, date }, { upsert: true });
            return res.status(200).send();
        }
        catch (err) {
            return res.status(500).send();
        }
    }
}
exports.default = postController;
//# sourceMappingURL=post.js.map