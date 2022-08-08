# Testing Hedera Integration

This repository is a step-by-step tutorial for testing NFT transfers to and from Hedera using the XP.Network bridge.

## 0. Installation

Clone this repository and install its dependencies:

```bash
git clone https://github.com/XP-NETWORK/testing-hedera.git
cd testing-hedera/
yarn
```

## 1. Populating the environment variables

Rename the `.env.example` into `.env` and provide the values to its keys:

```bash
EVM_SK=                     # Your EVM account private key
HEDERA_SK=                  # Your Hedera account private key
HEDERA_ACCOUNT=             # Your public key on Hedera
HEDERA_TO_EVM=              # EVM representation of your Hedera public key
HEDERA_COLLECTION=          # Your Hedera Collection Identifier
HEDERA_COLLECTION_NAME=     # The name of the collection minted on Hedera
HEDERA_SEL_ID=              # The ID of the selected NFT on Hedera
HEDERA_URI=                 # The URI of the minted NFT on Hedera
```

Set HEDERA_SEL_ID=0 for the first run.

## 2. Transferring an NFT from Hedera to BSC

In the terminal run:

```bash
yarn hedera_bsc
```
If the final line of the output looks like:<br/>
✨  Done in {number of seconds}s.<br/>
Everything went well. Check the results in the explorers of the blockchains.

## 3. Transferring an NFT from BSC to Hedera

In the terminal run:

```bash
yarn bsc_hedera
```
If the final line of the output looks like:<br/>
✨  Done in {number of seconds}s.<br/>
Everything went well. Check the results in the explorers of the blockchains.

To dive deeper, study the code in the `src` folder of the present project.