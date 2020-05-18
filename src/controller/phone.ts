import model from "../model";
const TeleSignSDK = require("telesignsdk");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const customerId = process.env.customerId;
const apiKey = process.env.apiKey;
const rest_endpoint = process.env.rest_endpont;
const timeout = 10 * 1000;
const exp_Date = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

const client = new TeleSignSDK(customerId, apiKey, rest_endpoint, timeout);
function messageCallback(error, responseBody) {
  if (error === null) {
    console.log(
      `Messaging response for messaging phone number:` +
        ` => code: ${responseBody["status"]["code"]}` +
        `, description: ${responseBody["status"]["description"]}`
    );
  } else {
    throw "Unable to send message. " + error;
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
      let update = await model.phoneVerification.updateOne(
        { phoneNumber },
        { phoneNumber, code },
        { upsert: true }
      );
      if (!update) {
        return res.status(500).send();
      } else {
        return res.status(200).send();
      }
    } catch (err) {
      return res.status(500).send();
    }
  }

  async codeVerify(req, res) {
    const { phoneNumber, code } = req.body;
    try {
      let find = await model.phoneVerification.findOne({
        phoneNumber,
        code,
      });
      if (!find) {
        return res.status(404).send();
      } else {
        const token = jwt.sign({ exp: exp_Date,
          phoneNumber},process.env.SECRET);
        let update = await model.phone.updateOne(
          { phoneNumber },
          { phoneNumber },
          { upsert: true }
        );
        if (!update) {
          return res.status(500).send();
        } else {
          await model.phoneVerification.deleteOne({ phoneNumber, code });
          return res.status(200).json({token});
        }
      }
    } catch (err) {
      return res.status(500).send();
    }
  }
  async verifyToken(req, res) {
    const { token } = req.body;
    try {
      await jwt.verify(token, process.env.SECRET)
      return res.status(200).send()
    } catch (err) {
      return res.status(401).send();
    }
  }
}

export default phoneController;
