"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const image = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});
image.set('toJSON', {
    virtuals: true,
});
exports.default = mongoose_1.default.model('image', image);
//# sourceMappingURL=image.js.map