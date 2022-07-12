import {
  editProjectById,
  getListofProjects,
} from "../../../services/PrismaService";
import { createNewProject } from "../../../services/PrismaService";
import { getSession } from "next-auth/react";
import { createEncryptedWallet } from "../../../services/Web3jsService";
import {fetchTransactionsByAddress, getZCTBalance, getZCTBalances, mintZCT} from "../../../services/ZCTService";
import log from "tailwindcss/lib/util/log";
import {getMaticBalances, transferMatic} from "../../../services/MaticService";

const getCalculatorTypes = `SELECT * FROM Projects`;

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        let result = await getListofProjects(getCalculatorTypes);
        const addresses = await getZCTBalances(result)
        const addressesWithMatic = (await getMaticBalances(addresses))
        // await fetchTransactionsByAddress("0x6c578c393dc9176497e797a54631f8c7c1e0522e")
        res.status(200).json(addressesWithMatic);
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
      }
      break;

    // Create data from database
    case "POST":
      try {
        const wallet = createEncryptedWallet();
        const result = await createNewProject(
          req.body,
          JSON.stringify(wallet),
          wallet.address
        );
        console.log(await transferMatic(`0x${wallet.address}`, "1"))
        mintZCT(`0x${wallet.address}`, String(req.body.totalsupply)).then(
            console.log("Minted in farm wallet")
            )
        res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }

      break;

    // Delete data from database
    case "DELETE":
      break;

    // Update data from database
    case "PUT":
      try {
        const result = await editProjectById(req.body, id);
        res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }
      break;
  }
}
