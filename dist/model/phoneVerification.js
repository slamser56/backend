"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const phoneVerification = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    code: {
        type: Number,
        required: true,
    },
});
phoneVerification.set('toJSON', {
    virtuals: true,
});
exports.default = mongoose_1.default.model('phoneVerification', phoneVerification);
//# sourceMappingURL=phoneVerification.js.map