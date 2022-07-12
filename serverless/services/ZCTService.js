import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import {abiJson} from "../utils/constants";
import log from "tailwindcss/lib/util/log";
import * as fs from "fs";
import {decryptWallet} from "./Web3jsService";
import {getPrivateKeys} from "@truffle/hdwallet-provider/dist/constructor/getPrivateKeys";

const childRPC = 'https://rpc-mumbai.maticvigil.com/'
// const childRPC = "https://polygon-mumbai.infura.io/v3/579ec05cfce44d31854d6f693d5fa907"
// https://polygon-mumbai.infura.io/v3/579ec05cfce44d31854d6f693d5fa907
// const childRPC =
//     "wss://ropsten.infura.io/ws/v3/579ec05cfce44d31854d6f693d5fa907";
const mnemonic = fs.readFileSync(".secret").toString().trim();
const devWallet="0x427897086E5Ac14561a7559B694617EaF5e0c1d8"
const web3 = new Web3(
    new HDWalletProvider({
        mnemonic: {
            phrase:
            mnemonic,
        },
        providerOrUrl: childRPC,
        pollingInterval: 8000
    })
);


const tokenAddress = "0x26B82ef7812D5D2f4Ca3bD8140FC5642702D9e0e";

const erc20Contract = new web3.eth.Contract(abiJson().abi, tokenAddress);

export const getZCTBalance = async (address) => {
    return erc20Contract.methods
        .balanceOf(address)
        .call()
        .then((balance) => {
            return Web3.utils.fromWei(balance);
        });
};

export const getZCTBalances = async (addresses) => {
    for (let i = 0; i < addresses.length; i++) {
        addresses[i].balance = await getZCTBalance(`0x${addresses[i].publicAddress}`)
    }
    return addresses
};


//Transfers tokens from one address to another. Request sent by dev wallet so dev wallet pays gas fees.
export const transferZCT = async (from, to, amount) => {
    const fromWallet = decryptWallet(from)
    const localWeb3Connection = new Web3(
        new HDWalletProvider({
            privateKeys: [fromWallet.privateKey],
            providerOrUrl: childRPC,
            pollingInterval: 8000
        })
    );
    const localErc20Contract = new localWeb3Connection.eth.Contract(abiJson().abi, tokenAddress);
    //Called from the farm wallet
    await localErc20Contract.methods
        .approve(devWallet, Web3.utils.toWei(amount))
        .send({from: fromWallet.address});

    return erc20Contract.methods
        .transferFrom(fromWallet.address, to, Web3.utils.toWei(amount))
        .send({from: devWallet})
        .then((balance) => {
            return Web3.utils.fromWei(balance.toString());
        });
};

export const mintZCT = async (address, amount) => {
    return erc20Contract.methods
        .mint(address, Web3.utils.toWei(amount))
        .send({from: devWallet, value: "0"})
        .then((balance) => {
            return Web3.utils.fromWei(balance);
        });
};

export const fetchTransactionsByAddress = async (address) => {

    const res = await fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0xDb6C1E3eE0370Abfc240Df451Ddd72FD05315F4B&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=DKKBHH9D4HYB15JA4P1YVEZQX316D78JAR`);
    console.log(await res.json());



}



