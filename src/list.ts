import { BigNumber as EthBN, utils, Wallet } from "@hashgraph/hethers";
import BigNumber from "bignumber.js";
import { exit } from "process";
import config from "./config";

export const listHederaNfts = async (
    address: string
) => {

    const {
        factory,
        hedera,
    } = await config.setup();

    const nfts = await factory.nftList(hedera, address!);

    return nfts;

}

(async () => {

    const {signer} = await config.setup();
    
    const nfts = await listHederaNfts(
        signer.address!
    );

    console.log("NFTs:", nfts);

    exit(0)
})().catch(e => {
    console.error(e);
    exit(1)
});
