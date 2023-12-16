import prisma from "@p/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { object, z } from "zod";
import ErrorHandler from "./ErrorHandlers";
import { BudgetUpdateSchema } from "@lib/schemas/BudgetSchemas";
import { BudgetServices } from "@lib/services/BudgetServices";

export const BudgetController = {
  async GetAllBudgets(req: NextApiRequest, res: NextApiResponse) {
    const budgets = await BudgetServices.GetAllBudgets();
    return res.status(200).json(budgets);
  },
  async GetBudget(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const budget = await BudgetServices.GetBudgetById(parsedId);
      return res.status(200).json(budget);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async CreateBudget(req: NextApiRequest, res: NextApiResponse) {
    try {
      const budgetData = await BudgetUpdateSchema.parseAsync(req.body);
      const budget = await BudgetServices.CreateBudget(budgetData);
      return res.status(200).json(budget);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async DeleteBudget(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const budget = await BudgetServices.DeleteBudget(parsedId);
      return res.status(200).json(budget);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
  async UpdateBudget(req: NextApiRequest, res: NextApiResponse) {
    try {
      const parsedId = await z.string().uuid().parseAsync(req.query);
      const parsedBudgetData = await BudgetUpdateSchema.parseAsync(req.body);
      const budget = await BudgetServices.UpdateBudget(parsedId, parsedBudgetData);
      return res.status(200).json(budget);
    } catch (e) {
      const error = await ErrorHandler(req, res, e);
      return error;
    }
  },
};
