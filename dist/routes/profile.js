"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const profileController = new controller_1.default.profile();
const verifyToken = async function (req, res, next) {
    try {
        const { _id } = await jsonwebtoken_1.default.verify(req.body.token, process.env.SECRET);
        Object.assign(req.body, { _id });
    }
    catch (error) {
        return res.status(401).send();
    }
    next();
};
router.post('/uploadAvatar', verifyToken, profileController.uploadAvatar);
router.post('/getAvatar', verifyToken, profileController.getAvatar);
exports.default = router;
//# sourceMappingURL=profile.js.map