import {
  editProjectById,
  getListofProjects,
} from "../../../../services/PrismaService";
import { createNewProject } from "../../../../services/PrismaService";

export default async function handler(req, res) {
  switch (req.method) {
    // Delete data from database
    case "DELETE":
      break;

    // Update data from database
    case "PUT":
      const id = req.query.id;
      try {
        const result = await editProjectById(req.body, id);
        console.log(id);
        res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
      }
      break;
  }
}
