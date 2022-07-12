import {getSession} from "next-auth/react";
import {execute_query} from "../../../../../utils/db";
import {deleteCalculatorType} from "../../../../../services/PrismaService";

const getPublicCalculatorCategoriesByTypeId = `SELECT CalculatorType.id, CalculatorCategory.id, CalculatorCategory.name FROM CalculatorCategory 
                                         JOIN CalculatorType ON CalculatorType.id = CalculatorCategory.type_id 
                                         WHERE CalculatorType.id = ? AND CalculatorType.public = 1`;

export default async function handler(req, res) {

    const { typeId } = req.query;

        switch (req.method) {
            // Get data from database
            case "GET":
                try {
                    const result = await execute_query(
                        getPublicCalculatorCategoriesByTypeId,
                        typeId
                    );
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