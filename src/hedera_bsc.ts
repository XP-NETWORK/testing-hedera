import { hethers } from "@hashgraph/hethers";
import { AppConfigs, Chain, EthNftInfo, NftInfo, ChainFactory, ChainFactoryConfigs, NftMintArgs  } from "xp.network";
import {config} from 'dotenv';
config();

(async () => {
  const factory = ChainFactory(
    AppConfigs.TestNet(),
    await ChainFactoryConfigs.TestNet()
  );
  const bsc = await factory.inner(Chain.BSC);
  const hedera = await factory.inner(Chain.HEDERA);

  const wallet = new hethers.Wallet(
    {
      //@ts-ignore
      account: process.env.HEDERA_ACCOUNT!,
      privateKey:process.env.HEDERA_SK!,
      isED25519Type: true,
    },
    hedera.getProvider()
  );

  const token_uri = process.env.HEDERA_URI!;
  const userNftMinter: string = (await ChainFactoryConfigs.TestNet()).hederaParams!.erc721Minter!;

  const chosenOne: NftInfo<EthNftInfo> = {
    collectionIdent: process.env.HEDERA_COLLECTION!,
    uri: token_uri,
    native: {
      chainId: Chain.HEDERA.toString(),//29,
      contract: userNftMinter,
      contractType: "ERC721",
      owner: process.env.HEDERA_TO_EVM!,
      tokenId: process.env.HEDERA_SEL_ID!,
      uri: token_uri,
    },
  };

  console.log("Minting an NFT...");
  
  const mintResult = await factory.mint(
    hedera as any,
    wallet as any,
    {
      contract: userNftMinter,
      uris:[chosenOne.uri],
      name: process.env.HEDERA_COLLECTION_NAME!
    } as NftMintArgs
  );

  console.log("Minted.", mintResult);
  console.log(`Wallet balance: ${(await wallet.getBalance()).toString()}`);
  console.log(`selected NFT:`, chosenOne);
  console.log(`\nTransferring...`);
  

  const transfer = await factory.transferNft(
    hedera,
    bsc,
    chosenOne,
    wallet as any,
    process.env.EVM_PK!,
    undefined,
    undefined,
    "1000000"
  );

  console.log(transfer);
  process.exit(0);
})().then(() => {
  process.exit(1);
});
