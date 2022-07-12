export const fetchTransactionsByAddress = async (address) => {
    return await fetch(`https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x26B82ef7812D5D2f4Ca3bD8140FC5642702D9e0e&address=${address}&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=DKKBHH9D4HYB15JA4P1YVEZQX316D78JAR`)
        .then(response => response.json())
        .then(data => data)
}

