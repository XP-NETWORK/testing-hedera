import { BigNumber as EthBN, utils, Wallet } from "@hashgraph/hethers";
import BigNumber from "bignumber.js";
import { exit } from "process";
import config from "./config";

(async () => {
    
    const {
        factory,
        hedera,
        signer,
        bsc
    } = await config.setup();

    const nfts = await factory.nftList(hedera, signer.address!);

    console.log("Found NFTs:", nfts.length);
    
    const chosenNFT =
        nfts.find((nft) =>
            nft.native.tokenId === config.HTS_TOKEN_SERIAL_NUMBER 
            && nft.collectionIdent === config.HTS_TOKEN_ADDRESS
        )!;
    console.log("Selected:", chosenNFT);
    
    const transfer = await factory.transferNft(
        hedera,
        bsc,
        chosenNFT,
        signer as any,
        config.RECEIVER_ADDRESS!,
        new BigNumber(utils.formatHbar("100000000").toString()),
        undefined,
        EthBN.from("15000000"),
    );

    console.log(`Transfer Result: `, transfer);

    exit(0)
})().catch(e => {
    console.error(e);
    exit(1)
});
