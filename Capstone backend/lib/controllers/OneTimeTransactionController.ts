import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { OneTimeTransactionUpdateSchema } from "@lib/schemas/OneTimeTransactionSchemas";
import { OneTimeTransactionServices } from "@lib/services/OneTimeTransactionServices";

export const OneTimeTransactionController =  {
    async GetAllOneTimeTransactions(req: NextApiRequest, res: NextApiResponse) {
    const oneTimeTransactions = await OneTimeTransactionServices.GetAllOneTimeTransactions();
    return res.status(200).json(oneTimeTransactions);
    },
      async CreateOneTimeTransaction(req: NextApiRequest, res: NextApiResponse) {
        try {
          const groupData = await OneTimeTransactionUpdateSchema.parseAsync(req.body);
          const group = await OneTimeTransactionServices.CreateOneTimeTransaction(groupData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async DeleteOneTimeTransaction(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const group = await OneTimeTransactionServices.DeleteOneTimeTransaction(parsedId);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async UpdateOneTimeTransaction(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const parsedOneTimeTransactionData = await OneTimeTransactionUpdateSchema.parseAsync(req.body);
          const group = await OneTimeTransactionServices.UpdateOneTimeTransaction(parsedId, parsedOneTimeTransactionData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
}