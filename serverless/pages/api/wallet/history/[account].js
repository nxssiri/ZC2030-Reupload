import {getTransactionByUserId} from "../../../../services/PrismaService";

export default async function handler(req, res) {

    switch (req.method) {
        // Get data from database
        case "GET":
            const userId = req.query.account
            try {
                const result = await getTransactionByUserId(userId)
                res.status(200).json(result)
            } catch (e) {
                console.log(e);
                res.status(500).json({message: e.message});
            }
            break;
    }
}
