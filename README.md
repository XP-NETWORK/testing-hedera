# Testing XP.NETWORK NFT Bridge for Hedera HTS NFTs

## 0. Initializing the project

```bash
git clone https://github.com/XP-NETWORK/testing-hedera.git
cd testing-hedera/
yarn
mv .env.example .env
```

Mint one or several NFTs: https://wallet.hashpack.app/login/signin

## 1. Transferring NFTs Hedera (HTS) -> BSC (Example)

1.1 Populate the keys in `.env` file:

```bash
# 1. Populate before sending Hedera -> BSC
HTS_TOKEN_ADDRESS=0x0000000000000000000000000000000002e90220 #Example
HTS_TOKEN_SERIAL_NUMBER=1 # Example
PRIVATE_KEY_SENDER=your-hedera-private-key-here
ACCOUNT_SENDER=0.0.46848048 # Example
RECEIVER_ADDRESS=0x0d7df42014064a163DfDA404253fa9f6883b9187 #Example
HEDERA_FEE=100000000
HEDERA_EXTRA_FEE=15000000
```
1.2 In the project terminal run
```bash
yarn transfer
```

## 2. Unfreezinf NFTs BSC -> Hedera (HTS) (Example)

2.1 Populate the keys in `.env` file:

```bash
# 2. Populate before sending BSC -> Hedera
TOKEN_ID_RECEIVED_ON_BSC=1234567890 # Example
BSC_RECEIVER_PK=your-evm-private-key-here
```
2.2 In the project terminal run
```bash
yarn unfreeze
```