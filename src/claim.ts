import config from "./config";

(async () => {
    const {
        factory,
        hedera,
        signer,
    } = await config.setup();

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
