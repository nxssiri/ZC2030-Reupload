import { getUsersByEmail } from "../../../../services/PrismaService";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const apiSession = await getSession({ req });
  console.log(apiSession)
  if ((apiSession?.user?.role === "ADMIN")) {
  switch (req.method) {
    // Get data from database
    case "GET":
      const userEmail = decodeURI(req.query.email);
      try {
        const user = await getUsersByEmail(userEmail);
        const json = JSON.stringify(user, (key, value) =>
          typeof value === "bigint" ? parseInt(value) : value
        );
        res.status(200).json(json);
      } catch (e) {
        console.log(e);
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
    // Not Signed in
    res.status(401)
  }
  res.end()
}
