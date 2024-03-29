import { BudgetController } from "@lib/controllers/BudgetController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            await BudgetController.GetBudget(req, res)
            break;
        case "POST":
            await BudgetController.CreateBudget(req, res)
            break;
        case "PATCH":
            await BudgetController.UpdateBudget(req, res)
        case "DELETE":
            await BudgetController.DeleteBudget(req, res)
            break;
        default:
            res.status(405).end()
            break;
    }
}
