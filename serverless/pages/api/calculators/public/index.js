import { execute_query } from "../../../../utils/db";

const getPublicCalculatorTypes = `SELECT * FROM CalculatorType WHERE public = 1`;

// Extra script - might be needed
// const getCalculatorCategoriesByTypeId = `SELECT CalculatorType.id, CalculatorCategory.id, CalculatorCategory.name FROM CalculatorCategory
//                                          JOIN CalculatorType ON CalculatorType.id = CalculatorCategory.type_id
//                                          WHERE CalculatorType.id = 1`;
//
// const getCalculatorCategoriesByTypeName = `SELECT CalculatorType.id, CalculatorCategory.id, CalculatorCategory.name FROM CalculatorCategory
//                                         JOIN CalculatorType ON CalculatorType.id = CalculatorCategory.type_id
//                                         WHERE CalculatorType.name = "Individual"`;
//
// const getCalculatorInputsByCategoryId = ` SELECT CalculatorInput.id, CalculatorInput.name, CalculatorInput.factor, CalculatorInput.unit
//                                           FROM CalculatorCategory
//                                           JOIN CalculatorInput ON CalculatorCategory.id = CalculatorInput.category_id
//                                           WHERE CalculatorCategory.id = 1`;
//
// const getCalculatorInputsByCategoryName = ` SELECT CalculatorInput.id, CalculatorInput.name, CalculatorInput.factor, CalculatorInput.unit
//                                           FROM CalculatorCategory
//                                           JOIN CalculatorInput ON CalculatorCategory.id = CalculatorInput.category_id
//                                           WHERE CalculatorCategory.name = "Food" `;

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await execute_query(getPublicCalculatorTypes);
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
