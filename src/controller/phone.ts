import model from "../model";
import config from "../config";
const TeleSignSDK = require("telesignsdk");
const jwt = require('jsonwebtoken');

const customerId = config.customerId;
const apiKey = config.apiKey;
const rest_endpoint = config.rest_endpont;
const timeout = 10 * 1000;

const client = new TeleSignSDK(customerId, apiKey, rest_endpoint, timeout);
function messageCallback(error: any, responseBody: any) {
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

function between(min: any, max: any) {
  return Math.floor(Math.random() * (max - min) + min);
}

class phoneController {
  async sendCode(req: any, res: any) {
    const { phoneNumber } = req.body;
    if(isNaN(Number(phoneNumber))){
      return res.status(404).send();
    }
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
      console.log(err);
      return res.status(500).send();
    }
  }

  async codeVerify(req: any, res: any) {
    const { phoneNumber, code } = req.body;
    try {
      let find = await model.phoneVerification.findOne({
        phoneNumber,
        code,
      });
      if (!find) {
        return res.status(404).send();
      } else {
        const token = jwt.sign({ exp: config.EXP_DATE,
          phoneNumber},config.SECRET);
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
      console.log(err);
      return res.status(500).send();
    }
  }
  async verifyToken(req: any, res: any) {
    const { token } = req.body;
    try {
      await jwt.verify(token, config.SECRET)
      return res.status(200).send()
    } catch (err) {
      console.log(err);
      return res.status(401).send();
    }
  }
}

export default phoneController;
