"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const router = express_1.default.Router();
const phoneController = new controller_1.default.phone();
router.post('/sendCode', phoneController.sendCode);
router.post('/codeVerify', phoneController.codeVerify);
router.post('/verifyToken', phoneController.verifyToken);
exports.default = router;
//# sourceMappingURL=phone.js.map