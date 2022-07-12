import {getListofProjects} from "../../../services/PrismaService";
import {getZCTBalances} from "../../../services/ZCTService";
import {fetchTransactionsByAddress} from "../../../services/WalletService";
import Web3 from "web3";

export default async function handler(req, res) {

    switch (req.method) {
        // Get data from database
        case "GET":
            const address = req.query.account
            console.log("999" + address)
            try {
                const result = await fetchTransactionsByAddress(`0x${address}`);
                // console.log(result)
                // console.log(result.result)
                const blockchainTxs = result.result.reduce(function (map, transaction) {
                    if (transaction.from in map)
                        map[transaction.from] = map[transaction.from] + parseInt(Web3.utils.fromWei(transaction.value));
                    else {
                        map[transaction.from] = parseInt(Web3.utils.fromWei(transaction.value));
                    }
                    return map;
                }, {});
                console.log(blockchainTxs)
                console.log("ppp")
                //{"status":"1","message":"OK",
                // "result":[{"blockNumber":"25706137",
                // "timeStamp":"1648496083",
                // "hash":"0x6083aa7d065594347a514fd70bd05d3b4aa59de1d611a73b72b1d7a3169dc6b8",
                // "nonce":"25","blockHash":"0xc36a87d4f63c5f592c40c046f5977e7ac6c1453cb2733535e484af191dea0546",
                // "from":"0x508c005cee283ad01632c72bd3e7e4ddf036e6dd","contractAddress":"0x26b82ef7812d5d2f4ca3bd8140fc5642702d9e0e",
                // "to":"0xabbd8430fa0fb6332682c894fbd88398e2435530","value":"750000000000000000000",
                // "tokenName":"ZC-Token","tokenSymbol":"ZCT","tokenDecimal":"18","transactionIndex":"25","gas":"70598",
                // "gasPrice":"2500202055","gasUsed":"60356","cumulativeGasUsed":"12552750","input":"deprecated",
                // "confirmations":"98"}]}
                res.status(200).json(blockchainTxs)
            } catch (e) {
                console.log(e);
                res.status(500).json({message: e.message});
            }
            break;
    }
}
