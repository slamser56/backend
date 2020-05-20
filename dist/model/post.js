"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const post = new Schema({
    idUser: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    images: {
        type: Array,
    },
});
post.set('toJSON', {
    virtuals: true,
});
exports.default = mongoose_1.default.model('post', post);
//# sourceMappingURL=post.js.map