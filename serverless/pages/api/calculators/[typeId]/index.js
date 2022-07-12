import { execute_query } from "../../../../utils/db";
import { deleteCalculatorType } from "../../../../services/PrismaService";
import { getSession } from "next-auth/react";

const getCalculatorCategoriesByTypeId = `SELECT CalculatorType.id, CalculatorCategory.id, CalculatorCategory.name FROM CalculatorCategory 
                                         JOIN CalculatorType ON CalculatorType.id = CalculatorCategory.type_id 
                                         WHERE CalculatorType.id = ?`;

const saveCalculatorCategory = ` INSERT INTO CalculatorCategory(type_id, name)
                                   VALUES (?, ?)`;

const updateCalculatorCategory = ` UPDATE CalculatorCategory
                                     SET type_id = ?, name = ?
                                     WHERE id = ?`;

const deleteCalculatorCategory = `DELETE FROM CalculatorCategory
                                  WHERE id = ?`;

export default async function handler(req, res) {

  const { typeId } = req.query;
  const calculatorSession = req.body[0]?.user?.role;
  const apiSession = await getSession({ req });
  console.log("Types: " + calculatorSession)

  if ((calculatorSession === "PERSONAL") || (calculatorSession === "ADMIN") || (apiSession?.user?.role === "ADMIN")) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(
          getCalculatorCategoriesByTypeId,
          typeId
        );
        res.status(200).json(result);
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message });
      }
      break;

    // Create data from database
    case "POST":
      const typeIdPost = req.body[0];
      const namePost = req.body[1];

      try {
        const result = await execute_query(saveCalculatorCategory, [
          typeIdPost,
          namePost,
        ]);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;

    // Delete data from database
    case "DELETE":
      try {
        await deleteCalculatorType(BigInt(typeId));
        res.status(204).json();
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }

      break;

    // Update data from database
    case "PUT":
      const typeIdPut = req.body[0];
      const namePut = req.body[1];
      const categoryIdPut = req.body[2];

      try {
        const result = await execute_query(updateCalculatorCategory, [
          typeIdPut,
          namePut,
          categoryIdPut,
        ]);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }

      break;
  }
  } else {
      res.status(401)
  }
  res.end()
}
