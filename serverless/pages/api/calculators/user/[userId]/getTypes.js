import { execute_query } from "../../../../../utils/db";

const getCalculatorTypes = `SELECT * FROM CalculatorType WHERE public = true OR id IN (SELECT type_id FROM UserCalculator WHERE user_id = ?);`;

export default async function handler(req, res) {
  const { userId } = req.query;
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(getCalculatorTypes, userId);
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
