import { OneTimeTransactionController } from "@lib/controllers/OneTimeTransactionController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await OneTimeTransactionController.GetAllOneTimeTransactions(req, res);
      break;
    case "POST":
      await OneTimeTransactionController.CreateOneTimeTransaction(req, res);
      break;
    case "DELETE":
      await OneTimeTransactionController.DeleteOneTimeTransaction(req, res);
      break;
    case "PATCH":
      await OneTimeTransactionController.UpdateOneTimeTransaction(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
