import {
    ChainFactoryConfigs, ChainFactory,
    NftMintArgs, Web3Helper, NftInfo, ElrondHelper
} from "xp.network";
import { config } from 'dotenv';
config();

// EVM chains compatible wallet:
import { Wallet } from "ethers";

export const testnetConfig = ChainFactoryConfigs.TestNet();

export const mint = async (departureChain: Web3Helper, uris: String[], contract: string, factory: ChainFactory) => {

    const signer = new Wallet(process.env.EVM_SK!, departureChain.getProvider());

    for await (const uri of uris) {

        const nftResult = await factory.mint(
            departureChain as any,
            signer,
            {
                contract,
                uris: [uri]
            } as NftMintArgs
        );
        console.log(`Done ${uri}`, nftResult);
    }
}

export const nftList = async (departureChain: Web3Helper, chainName: string, factory: ChainFactory) => {

    const signer = new Wallet(process.env.EVM_SK!, departureChain.getProvider());
    console.log(`Listing NFTs for ${chainName}:`);

    const NFTs = await factory.nftList(
        departureChain,
        signer.address
    );
    console.log(`On ${chainName} Found NFTs:`, NFTs.length);
    return NFTs;
}

export const transferNft = async (
    departureChain: Web3Helper, 
    destinationChain: Web3Helper | ElrondHelper, 
    selNFT: NftInfo<unknown>, 
    factory: ChainFactory, 
    mintwith: string|undefined,
    targetAddress: string | undefined) => {

    const signer = new Wallet(process.env.EVM_SK!, departureChain.getProvider());
    console.log(`Transferring NFT...`);

    const targetAddr = targetAddress ? targetAddress : signer.address;

    return await factory.transferNft(
        departureChain,
        destinationChain,
        selNFT,
        signer,
        targetAddr,
        undefined,
        mintwith,
        undefined
    )
}