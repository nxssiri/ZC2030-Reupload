import {
    editProjectById,
    getListofProjects,
} from "../../../services/PrismaService";
import { createNewProject } from "../../../services/PrismaService";
import { getSession } from "next-auth/react";
import { createEncryptedWallet } from "../../../services/Web3jsService";
import {fetchTransactionsByAddress, getZCTBalance, getZCTBalances, mintZCT} from "../../../services/ZCTService";
import log from "tailwindcss/lib/util/log";
import {getMaticBalances} from "../../../services/MaticService";

const getCalculatorTypes = `SELECT * FROM Projects`;

export default async function handler(req, res) {
    switch (req.method) {
        // Get data from database
        case "GET":
            try {
                let result = await getListofProjects(getCalculatorTypes);
                const addresses = (await getZCTBalances(result)).filter(address => address.balance >= 0.01)
                const addressesWithMatic = (await getMaticBalances(addresses)).filter(address => address.maticBalance >=0.01)
                res.status(200).json(addressesWithMatic);
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: e.message });
            }
            break;

        // Create data from database
        case "POST":
            break;

        // Delete data from database
        case "DELETE":
            break;

        // Update data from database
        case "PUT":
            break;
    }
}
