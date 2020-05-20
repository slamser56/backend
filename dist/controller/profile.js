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
class profileController {
    async uploadAvatar(req, res) {
        const { image, _id } = req.body;
        try {
            const result = await cloudinary.uploader.upload('data:image/jpeg;base64,' + image);
            await model_1.default.phone.updateOne({ _id }, { avatar: result.url });
            return res.status(200).json({ avatar: result.url });
        }
        catch (err) {
            return res.status(500).send();
        }
    }
    async getAvatar(req, res) {
        const { _id } = req.body;
        try {
            const { avatar } = await model_1.default.phone.findOne({
                _id,
            });
            if (avatar) {
                return res.status(200).json({ avatar });
            }
            else {
                return res.status(401).send();
            }
        }
        catch (err) {
            return res.status(500).send();
        }
    }
}
exports.default = profileController;
//# sourceMappingURL=profile.js.map