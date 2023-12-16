import { z } from "zod";
import prisma from "../../prisma";
import { DebtUpdateType, DebtCreateType } from "@lib/schemas/DebtSchemas";

export const DebtServices = {
  async GetAllDebts() {
    const debts = await prisma.debt.findMany();
  },
  async GetDebtById(id: string) {
    const debt = await prisma.debt.findFirst({
      where: {
        id: id,
      },
    });
    return debt;
  },
  async CreateDebt(debtData: DebtCreateType) {
    try {
      const debt = await prisma.debt.create({
        data: {
          ...debtData,
        },
      });
      return debt;
    } catch (e) {
      throw e;
    }
  },
  async UpdateDebt(id: string, debtData: Partial<DebtUpdateType>) {
    try {
      const debt = await prisma.debt.update({
        where: {
          id: id,
        },
        data: {
          ...debtData,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async DeleteDebt(id: string) {
    try {
      const debt = await prisma.debt.delete({
        where: {
          id: id,
        },
      });
      return debt;
    } catch (e) {
      throw e;
    }
  },
};
