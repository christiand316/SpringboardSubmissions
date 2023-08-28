import { z } from "zod";
import prisma from "../../prisma";
import { OneTimeTransactionUpdateType, OneTimeTransactionCreateType } from "@lib/schemas/OneTimeTransactionSchemas";

export const OneTimeTransactionServices = {
  async GetAllOneTimeTransactions() {
    const oneTimeTransactions = await prisma.oneTimeTransaction.findMany();
  },
  async GetOneTimeTransactionById(id: string) {
    const oneTimeTransaction = await prisma.oneTimeTransaction.findFirst({
      where: {
        id: id,
      },
    });
    return oneTimeTransaction;
  },
  async CreateOneTimeTransaction(oneTimeTransactionData: OneTimeTransactionCreateType) {
    try {
      const oneTimeTransaction = await prisma.oneTimeTransaction.create({
        data: {
          ...oneTimeTransactionData,
        },
      });
      return oneTimeTransaction;
    } catch (e) {
      throw e;
    }
  },
  async UpdateOneTimeTransaction(id: string, oneTimeTransactionData: Partial<OneTimeTransactionUpdateType>) {
    try {
      const oneTimeTransaction = await prisma.oneTimeTransaction.update({
        where: {
          id: id,
        },
        data: {
          ...oneTimeTransactionData,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async DeleteOneTimeTransaction(id: string) {
    try {
      const oneTimeTransaction = await prisma.oneTimeTransaction.delete({
        where: {
          id: id,
        },
      });
      return oneTimeTransaction;
    } catch (e) {
      throw e;
    }
  },
};
