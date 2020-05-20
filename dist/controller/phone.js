"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../model"));
const TeleSignSDK = require('telesignsdk');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const customerId = process.env.customerId;
const apiKey = process.env.apiKey;
const rest_endpoint = process.env.rest_endpont;
const timeout = 10 * 1000;
const exp_Date = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
const client = new TeleSignSDK(customerId, apiKey, rest_endpoint, timeout);
function messageCallback(err, reply) {
    if (err) {
        console.log("Error: Could not reach TeleSign's servers");
        console.error(err); // network failure likely cause for error
    }
    else {
        console.log("YAY!, the SMS message is being sent now by TeleSign!");
        console.log(reply);
    }
}
function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
class phoneController {
    async sendCode(req, res) {
        const { phoneNumber } = req.body;
        const code = between(1000, 9999);
        try {
            //client.sms.message(messageCallback, phoneNumber, "Code: " + code, "ARN");
            let update = await model_1.default.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
            if (!update) {
                return res.status(500).send();
            }
            else {
                return res.status(200).send();
            }
        }
        catch (err) {
            return res.status(500).send();
        }
    }
    async codeVerify(req, res) {
        const { phoneNumber, code } = req.body;
        try {
            const find = await model_1.default.phoneVerification.findOne({
                phoneNumber,
                code,
            });
            if (!find) {
                return res.status(404).send();
            }
            else {
                await model_1.default.phone.updateOne({ phoneNumber }, { phoneNumber }, { upsert: true });
                const { _id } = await model_1.default.phone.findOne({ phoneNumber });
                if (!_id) {
                    return res.status(500).send();
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ exp: exp_Date, phoneNumber, _id }, process.env.SECRET);
                    await model_1.default.phoneVerification.deleteOne({ phoneNumber, code });
                    return res.status(200).json({ token });
                }
            }
        }
        catch (err) {
            return res.status(500).send();
        }
    }
    async verifyToken(req, res) {
        const { token } = req.body;
        try {
            await jsonwebtoken_1.default.verify(token, process.env.SECRET);
            return res.status(200).send();
        }
        catch (err) {
            return res.status(401).send();
        }
    }
}
exports.default = phoneController;
//# sourceMappingURL=phone.js.map