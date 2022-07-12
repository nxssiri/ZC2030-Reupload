import { execute_query } from "../../../utils/db";
import {getSession} from "next-auth/react";

const getAllUserData = `SELECT * FROM USER`;

const updateUser = `UPDATE USER 
SET 
    name = ?,
    email = ?,
    role = ?,
    ethWallet = ?
WHERE
    id = ?`;

// const handler = async (_, res) => {
//     try {
//         const result = await sql_query(getAllUserData);
//
//         return res.json(result);
//     } catch (e) {
//         console.log(res);
//         res.status(500).json({message: e.message});
//     }
// };

export default async function handler(req, res) {
  switch (req.method) {
      // Get data from database
    case "GET":
      try {
        const result = await execute_query(getAllUserData);
        res.status(200).json(result);
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

    case "PUT":
      try {
        const id = req.body[0];
        const name = req.body[1];
        const email = req.body[2];
        const role = req.body[3];
        const ethAddress = req.body[4];
        const result = await execute_query(updateUser, [name, email, role, ethAddress, id]);
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
      break;
  }
}

