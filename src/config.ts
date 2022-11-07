import { config } from "dotenv"; config();
import { BigNumber as EthBN, utils, Wallet } from "@hashgraph/hethers";
import {
  AppConfigs,
  Chain,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

const {
  HTS_TOKEN_ADDRESS,
  HTS_TOKEN_SERIAL_NUMBER,
  PRIVATE_KEY_SENDER,
  ACCOUNT_SENDER,
  RECEIVER_ADDRESS,
  BSC_RECEIVER_PK,
  RECEIVER_ON_HEDERA,
  TOKEN_ID_RECEIVED_ON_BSC
} = process.env;

export const setup = async () => {
  const factory = ChainFactory(
    AppConfigs.TestNet(),
    await ChainFactoryConfigs.TestNet(),
  );
  const bsc = await factory.inner(Chain.BSC);
  const hedera = await factory.inner(Chain.HEDERA);

  const signer = new Wallet(
    {
      privateKey:
        PRIVATE_KEY_SENDER!,
      account: ACCOUNT_SENDER!,
      isED25519Type: true,
    } as any,
    hedera.getProvider() as any,
  );

  return {
    factory,
    hedera,
    bsc,
    signer,
  }
}

export default {
  HTS_TOKEN_ADDRESS,
  HTS_TOKEN_SERIAL_NUMBER,
  PRIVATE_KEY_SENDER,
  ACCOUNT_SENDER,
  RECEIVER_ADDRESS,
  BSC_RECEIVER_PK,
  RECEIVER_ON_HEDERA,
  TOKEN_ID_RECEIVED_ON_BSC,
  setup,
  Chain
};
