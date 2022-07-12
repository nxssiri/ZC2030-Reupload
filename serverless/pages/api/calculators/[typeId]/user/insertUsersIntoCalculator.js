import {
  createUserCalculatorEntity,
  getUsersByEmail,
} from "../../../../../services/PrismaService";
import log from "tailwindcss/lib/util/log";

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database
    case "GET":
      break;

    // Create data from database
    case "POST":
      const typeId = req.query.typeId;
      const idList = req.body;
      try {
        const userCalculators = await idList.map(
          async (it) => await createUserCalculatorEntity(BigInt(typeId), it)
        );
        const json = JSON.stringify(userCalculators, (key, value) =>
          typeof value === "bigint" ? parseInt(value) : value
        );
        res.status(200).json(json);
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
      break;
  }
}
