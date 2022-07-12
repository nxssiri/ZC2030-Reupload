import {
  getUsersFromList,
  getUsersThatCanViewCalculator,
} from "../../../../../services/PrismaService";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req })
  const role = req.body[0]?.user;
  const { typeId } = req.query;

  if ((role) || (session?.user?.role === "ADMIN") ) {
  switch (req.method) {
    // Get data from database
    case "GET":
      try {
        const result = await getUsersThatCanViewCalculator(BigInt(typeId));
        const userIds = [];
        result.map((field) => userIds.push(field.user_id));
        const users = await getUsersFromList(userIds);
        // Serialization that avoids issue with BigInt
        const json = JSON.stringify(users, (key, value) =>
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
