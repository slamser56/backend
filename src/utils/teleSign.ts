import dotenv from 'dotenv';
import * as logger from './logger';

dotenv.config();

const TeleSignSDK = require('telesignsdk');

const client = new TeleSignSDK(
  process.env.customerId,
  process.env.apiKey,
  process.env.rest_endpont,
  process.env.TeleSignTimeout,
);
function messageCallback(err: string, reply: string): void {
  if (err) {
    logger.info("Error: Could not reach TeleSign's servers");
  } else {
    logger.info('YAY!, the SMS message is being sent now by TeleSign!');
  }
}

export default function smsMessage(phoneNumber: number, code: number): void{
  client.sms.message(messageCallback, phoneNumber, `Code: ${code}`, 'ARN');
}
