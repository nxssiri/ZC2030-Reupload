/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraApiKey = fs.readFileSync(".env").toString().trim();
const polygonScanApiKey = fs.readFileSync(".apiKey").toString().trim();

module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a development blockchain for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
   */

  networks: {

        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 7545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },

        matic: {
            provider: () => new HDWalletProvider(mnemonic, `https://polygon-mainnet.infura.io/v3/` + infuraApiKey),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },

        mumbai: {
            provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.infura.io/v3/` + infuraApiKey),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            networkCheckTimeout: 1000000,
            skipDryRun: false,
        },

        ropsten: {
        provider: () => new HDWalletProvider(mnemonic, `wss://ropsten.infura.io/ws/v3/` + infuraApiKey),
        network_id: 3,       // Ropsten's id
        gas: 5500000,        // Ropsten has a lower block limit than mainnet
        confirmations: 2,    // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 400,  // # of blocks before a deployment times out  (minimum/default: 50)
        networkCheckTimeout: 1000000,
        skipDryRun: false,     // Skip dry run before migrations? (default: false for public nets )
        },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.12",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },

    plugins: ['truffle-plugin-verify'],
    api_keys: {
        polygonscan: polygonScanApiKey
    }
};
