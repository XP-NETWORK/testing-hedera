import { Wallet } from "@hashgraph/hethers";
import { AppConfigs, Chain, ChainFactory, ChainFactoryConfigs } from "xp.network";
import config from "./config";

(async () => {
    const factory = ChainFactory(
        AppConfigs.TestNet(),
        await ChainFactoryConfigs.TestNet(),
    );
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

    const claimables = await factory.listHederaClaimableNFT(
        hedera.XpNft,
        "0x0000000000000000000000000000000002e88e06", // This is the address of the NFT contract that is owned by our proxy contract
        signer as any,
    );

    console.log(claimables);

    const claim = await factory.claimHederaNFT(
        claimables[0],
        hedera.XpNft,
        "0x0000000000000000000000000000000002e88e06",
        signer as any,
    );

    console.log(claim);
})();
