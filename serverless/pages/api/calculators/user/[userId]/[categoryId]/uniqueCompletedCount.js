import {
  getCountOfUsersUniqueFilledResultsByCategory,
  getInputsByCategory,
} from "../../../../../../services/PrismaService";

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database

    case "GET":
      try {
        const categoryId = parseInt(req.query.categoryId);
        const inputIds = await getInputsByCategory(categoryId);
        const idArray = inputIds.map((input) => input.id);
        const idsInputted = await getCountOfUsersUniqueFilledResultsByCategory(
          req.query.userId,
          idArray
        );
        let result;
        if (idsInputted !== []) {
          result =
            Math.round(((idsInputted.length * 100) / inputIds.length) * 10) /
            10;
        } else {
          result = 0;
        }
        res.status(200).json({ count: result });
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
