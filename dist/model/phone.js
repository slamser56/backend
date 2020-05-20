"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const phone = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    }
});
phone.set('toJSON', {
    virtuals: true,
});
exports.default = mongoose_1.default.model('phone', phone);
//# sourceMappingURL=phone.js.map