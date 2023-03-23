import ALL, {setup} from './config';
import {
    Client,
    TokenType,
    TokenSupplyType,
    PrivateKey,
    TokenCreateTransaction,
    TokenMintTransaction
} from '@hashgraph/sdk'

const TOKEN_ID = "0.0.3909070";
const HEDERA_URI = "https://meta.polkamon.com/meta?id=10001852306";


(async () => {

    const {
        ACCOUNT_SENDER,
        PRIVATE_KEY_SENDER,
    } = ALL;

    const client = Client.forTestnet();

    client.setOperator(
        ACCOUNT_SENDER!,
        PRIVATE_KEY_SENDER!
    );

//     const nftCreate = new TokenCreateTransaction()
//     .setTokenName("UserNftMinter")
//     .setTokenSymbol("UserNftMinter")
//     .setTokenType(TokenType.NonFungibleUnique)
//     .setDecimals(0)
//     .setInitialSupply(0)
//     .setTreasuryAccountId(ACCOUNT_SENDER!)
//     .setSupplyType(TokenSupplyType.Finite)
//     .setMaxSupply(2500)
//     .setSupplyKey(PrivateKey.fromString(PRIVATE_KEY_SENDER!))
//     .freezeWith(client);

//   const result = await nftCreate.execute(client);

//   console.log("Response:", result);

  const mintTx = new TokenMintTransaction()
    .setTokenId(TOKEN_ID)
    .setMetadata([Buffer.from(HEDERA_URI)])
    .freezeWith(client);

  //Sign with the supply private key of the token 
  const signTx = await mintTx.sign(PrivateKey.fromStringED25519(PRIVATE_KEY_SENDER!));

  //Submit the transaction to a Hedera network    
  const txResponse = await signTx.execute(client);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status " + transactionStatus.toString());

    process.exit(0);
})().catch(e => {
    console.error(e);
    process.exit(1);
})