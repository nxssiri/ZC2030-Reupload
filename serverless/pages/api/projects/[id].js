import { getProject } from "../../../services/PrismaService";
import {getZCTBalance, getZCTBalances} from "../../../services/ZCTService";

export default async function handler(req, res) {
  console.log(req.query.id);
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await getProject(req.query.id);
        result.balance = await getZCTBalance(`0x${result.publicAddress}`)
        res.status(200).json(result);
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
