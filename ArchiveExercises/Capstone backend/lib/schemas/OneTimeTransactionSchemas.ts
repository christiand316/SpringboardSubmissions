import { z } from "zod";

const OneTimeTransactionSchema = z.object({
  id: z.string().uuid(),
  
  budgetId: z.string().uuid(),
  description: z.string(),
  amount: z.number(),
  date: z.string()
});

export const OneTimeTransactionCreateSchema = OneTimeTransactionSchema.pick({
  budgetId: true,
  description: true,
  date: true,
  amount: true,
});
export const OneTimeTransactionUpdateSchema = OneTimeTransactionSchema.pick({
  budgetId: true,
  description: true,
  date: true,
  amount: true,
});

export type OneTimeTransactionUpdateType = z.infer<
  typeof OneTimeTransactionUpdateSchema
>;
export type OneTimeTransactionCreateType = z.infer<
  typeof OneTimeTransactionCreateSchema
>;
