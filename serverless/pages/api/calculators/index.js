import { execute_query } from "../../../utils/db";
import { updateCalculatorInputs } from "../../../services/CalculatorService";
import { createCalculator } from "../../../services/PrismaService";
import { getSession } from "next-auth/react";

const getCalculatorTypes = `SELECT *
                            FROM CalculatorType`;

const saveCalculatorType = ` INSERT INTO CalculatorType(name, public)
                             VALUES (?, 0)`;

const saveCalculatorInput = ` INSERT INTO CalculatorInput(category_id, name, factor, unit)
                              VALUES (?, ?, ?, ?)`;

const updateCalculatorType = ` UPDATE CalculatorType
                               SET name   = ?,
                                   public = ?
                               WHERE id = ?`;


export default async function handler(req, res) {

  const calculatorSession = req.body[0]?.user?.role;
  console.log("CALCULATORS: " + calculatorSession)
  const apiSession = await getSession({ req });
  console.log(apiSession)

  if ((calculatorSession === "ADMIN") || (apiSession?.user?.role === "ADMIN")) {
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
      const namePost = req.body[0];
      const publicPost = req.body[1];
      try {
        const result = await createCalculator(namePost, publicPost);
        const json = JSON.stringify(result, (key, value) =>
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
      const typeIdPut = req.body[0];
      const namePut = req.body[1];
      const publicPut = req.body[2];

      try {
        const result = await execute_query(updateCalculatorType, [
          namePut,
          publicPut,
          typeIdPut,
        ]);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
  }
  } else {
      // Not Signed in
      res.status(401)
  }
  res.end()
}
