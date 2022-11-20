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
  TOKEN_ID_RECEIVED_ON_BSC,
  HEDERA_FEE,
  HEDERA_EXTRA_FEE
} = process.env;

const checkIfSet = (variable:string|undefined, name:string) => {
  if(!variable) throw Error(`${name} in not set in the environment`);
}

checkIfSet(HTS_TOKEN_ADDRESS, "HTS_TOKEN_ADDRESS");
checkIfSet(HTS_TOKEN_SERIAL_NUMBER, "HTS_TOKEN_SERIAL_NUMBER");
checkIfSet(PRIVATE_KEY_SENDER, "PRIVATE_KEY_SENDER");
checkIfSet(ACCOUNT_SENDER, "ACCOUNT_SENDER");
checkIfSet(RECEIVER_ADDRESS, "RECEIVER_ADDRESS");
checkIfSet(BSC_RECEIVER_PK, "BSC_RECEIVER_PK");
checkIfSet(RECEIVER_ON_HEDERA, "RECEIVER_ON_HEDERA");
checkIfSet(TOKEN_ID_RECEIVED_ON_BSC, "TOKEN_ID_RECEIVED_ON_BSC");
checkIfSet(HEDERA_FEE, "HEDERA_FEE");
checkIfSet(HEDERA_EXTRA_FEE,"HEDERA_EXTRA_FEE");

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
  Chain,
  HEDERA_FEE,
  HEDERA_EXTRA_FEE
};
