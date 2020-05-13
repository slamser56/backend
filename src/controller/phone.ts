import model from "../model";
import config from "../config";
const TeleSignSDK = require("telesignsdk");

const customerId = config.customerId;
const apiKey = config.apiKey;
const rest_endpoint = "https://rest-api.telesign.com";
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
    const code = between(1000, 9999);
    try {
      //client.sms.message(messageCallback, phoneNumber, "Code: " + code, "ARN");
      let update = await model.phoneVerification.update(
        { phoneNumber },
        { phoneNumber, code },
        { upsert: true }
      );
      if (!update) {
        res.json({ status: false });
      } else {
        res.json({ status: true });
      }
    } catch (err) {
      res.json({ status: false });
      console.log(err);
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
        res.json({ status: false });
      } else {
        let update = await model.phone.update(
          { phoneNumber },
          { phoneNumber },
          { upsert: true }
        );
        if (!update) {
          res.json({ status: false });
        } else {
          await model.phoneVerification.deleteOne({ phoneNumber, code });
          res.json({ status: true });
        }
      }
    } catch (err) {
      res.json({ status: false });
      console.log(err);
    }
  }
}

export default phoneController;
