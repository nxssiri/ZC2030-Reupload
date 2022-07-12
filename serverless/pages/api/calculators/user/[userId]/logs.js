import { getUsersLogs } from "../../../../../services/PrismaService";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {

  const serverSideSession = req.body[0]?.user?.role;
  const apiSession = await getSession({ req });

  if (((serverSideSession === "PERSONAL") || (serverSideSession === "ADMIN") || apiSession?.user?.role === "ADMIN")) {
    switch (req.method) {
      // Get data from database
      case "GET":
        try {
          const logs = await getUsersLogs(req.query.userId);
          const json = JSON.stringify(logs, (key, value) =>
            typeof value === "bigint" ? parseInt(value) : value
          );
          res.status(200).json(json);
        } catch (e) {
          console.log(e)
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
  } else {
    res.status(401)
  }
  res.end()
}
