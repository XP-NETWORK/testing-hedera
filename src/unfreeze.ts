import { AppConfigs, Chain, ChainFactoryConfigs, ChainFactory } from 'xp.network';
import { Wallet } from 'ethers';
import config from './config';


(async () => {
    const factory = ChainFactory(
        AppConfigs.TestNet(),
        await ChainFactoryConfigs.TestNet(),
    );
    const bsc = await factory.inner(Chain.BSC);
    const near = await factory.inner(Chain.HEDERA);

    const signer = new Wallet(
        config.BSC_RECEIVER_PK,
        bsc.getProvider(),
    );

    const nfts = await factory.nftList(bsc, await signer.getAddress());

    console.log(`Found NFTs: ${nfts.length}\n\n`);

    const chosenOne = nfts.find((nft)=> nft.native.tokenId === config.TOKEN_ID_RECEIVED_ON_BSC)!

    console.log(`Using NFT: `, chosenOne);

    const transfer = await factory.transferNft(
        bsc,
        near,
        chosenOne,
        signer,
        config.RECEIVER_ON_HEDERA,
    );

    console.log(`Transfer Result: `, transfer);
})();
