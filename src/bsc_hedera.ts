import {
    ChainFactory,
    AppConfigs,
    Chain, NftInfo
} from "xp.network";
import { config } from 'dotenv';
config();

// EVM chains compatible wallet:
import { Wallet } from "ethers";
import {
    //mint,
    nftList,
    transferNft,
    testnetConfig
} from './functions';

(async () => {

    // Switcher flags:
    //const shallMint = false;
    const shallList = true;
    const shallApprove = true;
    const shallTransfer = true;
    let selected: NftInfo<any>;
    let selID;

    // Common setup:
    const factory = ChainFactory(AppConfigs.TestNet(), await testnetConfig);
    const bsc = await factory.inner(Chain.BSC);
    const hedera = await factory.inner(Chain.HEDERA);

    if (shallList) { // ==================== L I S T I N G ===============================
        const Nfts = await nftList(bsc, "BSC", factory);
        selID = 0;
        selected = Nfts[selID];
        console.log("Selected NFT:", selected);

        if(shallApprove) { // ==================== A P P R O V I N G =====================
            const signer = new Wallet(process.env.EVM_SK!, bsc.getProvider());
            const approved = await bsc.approveForMinter(selected, signer);
            console.log(`Approved: ${approved}`);
        }
    
        if (shallTransfer) { // ==================== T R A N S F E R R I N G ============
            
            const result = await transferNft(
                bsc, 
                hedera,
                selected, 
                factory, 
                undefined ,// Will arrive to the default contract
                process.env.HEDERA_TO_EVM!
            );
            console.log("Transfer result:", result);
    
        }
    }

    process.exit(0);
})().catch(error => {
    console.error("Error:", error);
    process.exit(1);
});