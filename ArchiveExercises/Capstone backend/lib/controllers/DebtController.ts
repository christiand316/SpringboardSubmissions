import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { DebtUpdateSchema } from "@lib/schemas/DebtSchemas";
import { DebtServices } from "@lib/services/DebtServices";

export const DebtController =  {
    async GetAllDebts(req: NextApiRequest, res: NextApiResponse) {
    const debts = await DebtServices.GetAllDebts();
    return res.status(200).json(debts);
    },
    async GetDebt(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const group = await DebtServices.GetDebtById(parsedId);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async CreateDebt(req: NextApiRequest, res: NextApiResponse) {
        try {
          const groupData = await DebtUpdateSchema.parseAsync(req.body);
          const group = await DebtServices.CreateDebt(groupData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async DeleteDebt(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const group = await DebtServices.DeleteDebt(parsedId);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async UpdateDebt(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const parsedDebtData = await DebtUpdateSchema.parseAsync(req.body);
          const group = await DebtServices.UpdateDebt(parsedId, parsedDebtData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
}