import { execute_query } from "../../../../../utils/db";
import {
  deleteCalculatorType,
  deleteCategoryByCategoryId,
  deleteInputByCategory,
} from "../../../../../services/PrismaService";
import { deleteCalculatorCategory } from "../../../../../services/CalculatorService";
import { getSession } from "next-auth/react";

const getCalculatorInputsByCategoryId = ` SELECT CalculatorInput.id, CalculatorInput.name, CalculatorInput.factor, CalculatorInput.unit 
                                          FROM CalculatorCategory
                                          JOIN CalculatorInput ON CalculatorCategory.id = CalculatorInput.category_id
                                          WHERE CalculatorCategory.id = ?`;

const saveCalculatorInput = ` INSERT INTO CalculatorInput(category_id, name, factor, unit)
                                   VALUES (?, ?, ?, ?)`;

const updateCalculatorInput = ` UPDATE CalculatorInput
                                SET category_id = ?, name = ?, factor = ?, unit = ?
                                WHERE id = ?`;

const deleteCalculatorInput = `DELETE FROM CalculatorInput
                                  WHERE id = ?`;

export default async function handler(req, res) {
  const { categoryId } = req.query;
  const apiSession = await getSession({ req });
  const calculatorSession = await req.body[0]?.user?.role;
  console.log("Category: " + req.body[0]?.user?.role)
  console.log(apiSession)

  if ((calculatorSession === "PERSONAL") || (calculatorSession === "ADMIN") || (calculatorSession === undefined) || (apiSession?.user?.role === "ADMIN")) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(
          getCalculatorInputsByCategoryId,
          categoryId
        );
        res.status(200).json(result);
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
      }
      break;

    // Create data from database
    case "POST":
      const categoryIdPost = req.body[0];
      const namePost = req.body[1];
      const factorPost = req.body[2];
      const unitPost = req.body[3];

      try {
        const result = await execute_query(saveCalculatorInput, [
          categoryIdPost,
          namePost,
          factorPost,
          unitPost,
        ]);

        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }

      break;

    // Delete data from database
    case "DELETE":
      try {
        await deleteCategoryByCategoryId(BigInt(req.query.categoryId));
        res.status(204).json();
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }

      break;

    // Update data from database
    case "PUT":
      const categoryIdPut = req.body[0];
      const namePut = req.body[1];
      const factorPut = req.body[2];
      const unitPut = req.body[3];
      const inputIdPut = req.body[4];

      try {
        const result = await execute_query(updateCalculatorInput, [
          categoryIdPut,
          namePut,
          factorPut,
          unitPut,
          inputIdPut,
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
