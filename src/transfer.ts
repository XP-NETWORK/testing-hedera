import { BigNumber as EthBN, utils, Wallet } from "@hashgraph/hethers";
import BigNumber from "bignumber.js";
import {
    AppConfigs,
    Chain,
    ChainFactory,
    ChainFactoryConfigs,
} from "xp.network";
import config from "./config";

(async () => {
    const factory = ChainFactory(
        AppConfigs.TestNet(),
        await ChainFactoryConfigs.TestNet(),
    );
    const bsc = await factory.inner(Chain.BSC);
    const hedera = await factory.inner(Chain.HEDERA);

    const signer = new Wallet(
        {
            privateKey:
                config.PRIVATE_KEY_SENDER,
            account: config.ACCOUNT_SENDER,
            isED25519Type: true,
        } as any,
        hedera.getProvider() as any,
    );

    const nfts = await factory.nftList(hedera, signer.address!);
    const chosenNFT =
        nfts.find((nft) =>
            nft.native.tokenId === config.HTS_TOKEN_SERIAL_NUMBER &&
            nft.collectionIdent === config.HTS_TOKEN_ADDRESS
        )!;

    const transfer = await factory.transferNft(
        hedera,
        bsc,
        chosenNFT,
        signer as any,
        config.RECEIVER_ON_BSC,
        new BigNumber(utils.formatHbar("100000000").toString()),
        undefined,
        EthBN.from("15000000"),
    );

    console.log(`Transfer Result: `, transfer);
})();
