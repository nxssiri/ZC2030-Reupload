import { execute_query } from "../../../utils/db";

const getCalculatorTypes = `SELECT * FROM CalculatorType`;

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(getCalculatorTypes);
        res.status(200).json(result);
      } catch (e) {
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
