import { config } from "dotenv";

config();

export default {
  HTS_TOKEN_ADDRESS: process.env.HTS_TOKEN_ADDRESS!,
  HTS_TOKEN_SERIAL_NUMBER: process.env.HTS_TOKEN_SERIAL_NUMBER!,
  PRIVATE_KEY_SENDER: process.env.PRIVATE_KEY_SENDER!,
  ACCOUNT_SENDER: process.env.ACCOUNT_SENDER!,
  RECEIVER_ON_BSC: process.env.RECEIVER_ON_BSC!,
  BSC_RECEIVER_PK: process.env.BSC_RECEIVER_PK!,
  RECEIVER_ON_HEDERA: process.env.RECEIVER_ON_HEDERA!,
  TOKEN_ID_RECEIVED_ON_BSC: process.env.TOKEN_ID_RECEIVED_ON_BSC!,
};
