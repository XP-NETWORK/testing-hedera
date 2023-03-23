import {TokenAssociateTransaction, PrivateKey, Client, TokenId} from '@hashgraph/sdk'
import ALL from './config'

const {
    PRIVATE_KEY_SENDER,
    ACCOUNT_SENDER
} = ALL;

const client = Client.forTestnet();

client.setOperator(
    ACCOUNT_SENDER!,
    PRIVATE_KEY_SENDER!
);

(async () => {
    //Associate a token to an account and freeze the unsigned transaction for signing
const transaction = await new TokenAssociateTransaction()
.setAccountId(ACCOUNT_SENDER!)
.setTokenIds([TokenId.fromSolidityAddress("0x00000000000000000000000000000000003B22a5")])
.freezeWith(client);

//Sign with the private key of the account that is being associated to a token 
const signTx = await transaction.sign(PrivateKey.fromStringED25519(PRIVATE_KEY_SENDER!));

//Submit the transaction to a Hedera network    
const txResponse = await signTx.execute(client);

//Request the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the transaction consensus status
const transactionStatus = receipt.status;

console.log("The transaction consensus status " +transactionStatus.toString());
process.exit(0);
})().catch(e => {
    console.error(e);
    process.exit(1);
});