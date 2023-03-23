import { Wallet } from 'ethers';
import config from './config';


(async () => {
    const {
        factory,
        hedera,
        bsc
    } = await config.setup();

    const signer = new Wallet(
        config.BSC_RECEIVER_PK!,
        bsc.getProvider(),
    );

    const nfts = await factory.nftList(bsc, await signer.getAddress());

    console.log(`Found NFTs: ${nfts.length}\n\n`);

    const chosenOne = nfts.find((nft)=> nft.native.tokenId === config.TOKEN_ID_RECEIVED_ON_BSC)!

    console.log(`Using NFT: `, chosenOne);

    const transfer = await factory.transferNft(
        bsc,
        hedera,
        chosenOne,
        signer,
        config.RECEIVER_ON_HEDERA!,
    );

    console.log(`Transfer Result: `, transfer);
    process.exit(0)
})().catch(e => {
    console.error(e);
    process.exit(1);
});
