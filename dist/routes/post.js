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
const postController = new controller_1.default.post();
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
router.post('/uploadPost', verifyToken, postController.uploadPost);
exports.default = router;
//# sourceMappingURL=post.js.map