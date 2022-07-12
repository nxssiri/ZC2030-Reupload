import { execute_query } from "../../../../../utils/db";

const getCalculatorDetails = `SELECT * FROM CalculatorType WHERE id = ?`;

export default async function handler(req, res) {
  const { typeId } = req.query;
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(getCalculatorDetails, typeId);
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
