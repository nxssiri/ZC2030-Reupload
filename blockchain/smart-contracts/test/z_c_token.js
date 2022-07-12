const ZCToken = artifacts.require("ZCToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ZCToken", function (/* accounts */) {
  it("should assert true", async function () {
    await ZCToken.deployed();
    return assert.isTrue(true);
  });
});
