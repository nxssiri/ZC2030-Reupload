import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {decryptWallet} from "./Web3jsService";
import Web3 from "web3";
import * as fs from "fs";
import {getZCTBalance} from "./ZCTService";

// install web3 plugin
use(Web3ClientPlugin);

//Setting up MaticJS
const posClient = new POSClient();
const parentRPC = "https://rpc-mumbai.maticvigil.com/"; //Matic chain
const mnemonic = fs.readFileSync(".secret").toString().trim();
const devWallet = "0x427897086E5Ac14561a7559B694617EaF5e0c1d8"
posClient.init({
  network: "testnet",
  version: "mumbai",
  parent: {
    provider: new HDWalletProvider({
      mnemonic: {
        phrase:
        mnemonic
      },
      providerOrUrl: parentRPC,
      pollingInterval: 8000
    }),
    defaultConfig: {
      from: devWallet,
    },
  },
  child: {
    provider: new HDWalletProvider({
      mnemonic: {
        phrase:
        mnemonic
      },
      providerOrUrl: "https://rpc-mumbai.maticvigil.com/",
      pollingInterval: 8000
    }),
    defaultConfig: {
      from: devWallet,
    },
  },
});

const erc20ParentToken = posClient.erc20(
  "0000000000000000000000000000000000001010"
);

export async function getMaticBalance(userAddress) {
  return (await erc20ParentToken.getBalance(userAddress)) / 1000000000000000000;
}

export async function getMaticBalances(addresses) {
    for (let i = 0; i < addresses.length; i++) {
      addresses[i].maticBalance = await getMaticBalance(`0x${addresses[i].publicAddress}`)
    }
    return addresses
}

//Transfers tokens from one address to another.
export const transferMatic = async (to, amount) => {
  return (await erc20ParentToken.transfer(amount=`${Web3.utils.toWei(amount)}`, to,{
        gasPrice: '30000000000',
    }))
};

