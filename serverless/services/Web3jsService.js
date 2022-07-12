import Web3 from "web3";

const web3 = new Web3(); //Insert eth node info

export const createEncryptedWallet = () => {
  const account = web3.eth.accounts.create();
  console.log(account);
  return web3.eth.accounts.encrypt(
    account.privateKey,
    process.env.ENCRYPTION_PASSWORD
  );
};

export const decryptWallet = (wallet) => {
  return web3.eth.accounts.decrypt(wallet, process.env.ENCRYPTION_PASSWORD);
};
