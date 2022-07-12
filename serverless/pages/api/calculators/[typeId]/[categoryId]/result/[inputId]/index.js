import { execute_query } from "../../../../../../../utils/db";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const getCalculatorInputsByCategoryId = `SELECT *
                                         FROM CalculatorResult
                                         WHERE input_id = ?`;

const saveCalculatorInputsByCategoryId = ` INSERT INTO CalculatorResult(input_id, quantity, result, user_id)
                                           VALUES (?, ?, ?, ?);
`;

export default async function handler(req, res) {
  const { input_id } = req.query;
  // const session = await getSession({ req })

  // if (session) {
  switch (req.method) {
    // Get data from database
    case "GET":
      // try {
      //     const result = await execute_query(getCalculatorInputsByCategoryId, input_id);
      //     res.status(200).json(result);
      //
      // } catch (e) {
      //     res.status(500).json({message: e.message});
      // }
      break;

    // Create data from database
    case "POST":
      const input_id = req.query.inputId;
      const result = req.body[0];
      const quantity = req.body[1];
      const userId = req.body[2];

      try {
        const response = await execute_query(saveCalculatorInputsByCategoryId, [
          input_id,
          quantity,
          result,
          userId,
        ]);
        res.status(200).json(response);
      } catch (e) {
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
  // } else {
  //   // Not Signed in
  //   res.status(200)
  // }
  // res.end()
}
