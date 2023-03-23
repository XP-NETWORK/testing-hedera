import config from "./config";
import {
    Client,
    ContractId,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar
} from '@hashgraph/sdk'

(async () => {
    const {
        factory,
        hedera,
        signer,
    } = await config.setup();

    const client = Client.forTestnet();

    client.setOperator(
        config.ACCOUNT_SENDER!,
        config.PRIVATE_KEY_SENDER!
    );

    console.log(hedera.XpNft);

    const token_to_claim = "0x00000000000000000000000000000000003B22a5"
    

    const claimables = await factory.listHederaClaimableNFT(
        hedera.XpNft,
        token_to_claim, 
        signer as any,
    );

    console.log(claimables);

    const claimNFT = async (token: string, htsToken: string, signer: any): Promise<boolean> => {
        const trx = await new ContractExecuteTransaction()
            .setContractId(ContractId.fromSolidityAddress(hedera.XpNft))
            .setGas(900000)
            .setMaxTransactionFee(new Hbar(12))
            .setFunction("claimNft", new ContractFunctionParameters()
            //@ts-ignore
            .addInt64(token)
            .addAddress(htsToken))
            .freezeWith(signer);
        const res = await trx.execute(signer);
        console.log(res, "res");
        return true;
    }

    const claim = await claimNFT(
        claimables[0].toString(),
        token_to_claim,
        client
    )

    console.log(claim);
    process.exit(0);
})().catch(e => {
    console.error(e);
    process.exit(1);
});
