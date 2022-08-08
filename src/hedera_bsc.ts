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

  const token_uri = "https://meta.polkamon.com/meta?id=10001852306";
  const userNftMinter: string = (await ChainFactoryConfigs.TestNet()).hederaParams!.erc721Minter!;

  const chosenOne: NftInfo<EthNftInfo> = {
    collectionIdent: "0x0000000000000000000000000000000002d8b52a",
    uri: token_uri,
    native: {
      chainId: Chain.HEDERA.toString(),//29,
      contract: userNftMinter,
      contractType: "ERC721",
      owner: process.env.HEDERA_TO_EVM!,
      tokenId: "10",
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
      name: "Hedera PolkaMon"
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
    "0x0d7df42014064a163DfDA404253fa9f6883b9187",
    undefined,
    undefined,
    "1000000"
  );

  console.log(transfer);
  process.exit(0);
})().then(() => {
  process.exit(1);
});
