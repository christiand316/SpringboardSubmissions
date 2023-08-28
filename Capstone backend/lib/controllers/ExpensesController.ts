import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { ExpensesUpdateSchema } from "@lib/schemas/ExpensesSchemas";
import { ExpensesServices } from "@lib/services/ExpensesServices";

export const ExpensesController =  {
    async GetAllExpenses(req: NextApiRequest, res: NextApiResponse) {
    const expenses = await ExpensesServices.GetAllExpenses();
    return res.status(200).json(expenses);
    },
    async GetExpenses(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const group = await ExpensesServices.GetExpensesById(parsedId);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async CreateExpenses(req: NextApiRequest, res: NextApiResponse) {
        try {
          const groupData = await ExpensesUpdateSchema.parseAsync(req.body);
          const group = await ExpensesServices.CreateExpenses(groupData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async DeleteExpenses(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const group = await ExpensesServices.DeleteExpenses(parsedId);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
      async UpdateExpenses(req: NextApiRequest, res: NextApiResponse) {
        try {
          const parsedId = await z.string().uuid().parseAsync(req.query);
          const parsedExpensesData = await ExpensesUpdateSchema.parseAsync(req.body);
          const group = await ExpensesServices.UpdateExpenses(parsedId, parsedExpensesData);
          return res.status(200).json(group);
        } catch (e) {
          const error = await ErrorHandler(req, res, e);
          return error;
        }
      },
}