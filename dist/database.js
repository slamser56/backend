"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.database = async () => {
    try {
        mongoose_1.default.set('debug', true);
        await mongoose_1.default.connect(String(process.env.MONGO_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, function (err) {
            if (err) {
                Promise.reject();
            }
        });
        Promise.resolve();
    }
    catch (error) {
        Promise.reject(error);
    }
};
//# sourceMappingURL=database.js.map