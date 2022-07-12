import {
  deleteCategoryByCategoryId,
  deleteInputByInputId,
} from "../../../../../../services/PrismaService";

export default async function handler(req, res) {
  switch (req.method) {
    // Get data from database
    case "GET":
      break;

    // Create data from database
    case "POST":
      break;

    // Delete data from database
    case "DELETE":
      try {
        await deleteInputByInputId(BigInt(req.query.inputId));
        res.status(204).json();
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }

      break;

    // Update data from database
    case "PUT":
      break;
  }
}
