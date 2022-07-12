const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const ZCToken = artifacts.require("./ZCToken.sol");

module.exports = async function (deployer) {
    const instance = await deployProxy(ZCToken, {deployer});
    console.log("Deployed", instance.address)
};