import { z } from "zod";
import prisma from "../../prisma";
import { BudgetUpdateType, BudgetCreateType } from "@lib/schemas/BudgetSchemas";

export const BudgetServices = {
  async GetAllBudgets() {
    const budgets = await prisma.budget.findMany();
    return budgets;
  },
  async GetBudgetById(id: string) {
    const budget = await prisma.budget.findFirst({
      where: {
        id: id,
      },
    });
    return budget;
  },
  async CreateBudget(budgetData: BudgetCreateType) {
    try {
      const budget = await prisma.budget.create({
        data: {
            ...budgetData,
          },
      });
      return budget;
    } catch (e) {
      throw e;
    }
  },
  async UpdateBudget(id: string, budgetData: Partial<BudgetUpdateType>) {
    try {
      const budget = await prisma.budget.update({
        where: {
          id: id,
        },
        data: {
          ...budgetData,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async DeleteBudget(id: string) {
    try {
      const budget = await prisma.budget.delete({
        where: {
          id: id,
        },
      });
      return budget;
    } catch (e) {
      throw e;
    }
  },
};

// async function asloaslasl(data: any) {
//     const validatedIncoming = z.object({
//         id: z.string().uuid(),
//         amount: z.number(),

//     }).parse(data)
//     await prisma.user.create({data: {...data}})
// }
/**
 * 
 * 
 * 
 *   async GetBudgetRecipients(id: string) {
    try {
      const recipients = await prisma.recipient.findMany({
        where: {
          budgetId: id,
        },
      });
      return recipients;
    } catch (e) {
      throw e;
    }
  },
  async GetPaymentBudgets(id: string) {
    try {
      const paymentBudgets = await prisma.paymentBudget.findMany({
        where: {
          budgetId: id,
        },
      });
      return paymentBudgets;
    } catch (e) {
      throw e;
    }
  },
 */
