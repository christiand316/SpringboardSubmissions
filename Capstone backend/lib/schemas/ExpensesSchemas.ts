import { z } from "zod";

const ExpensesSchema = z.object({
  id: z.string().uuid(),
  recurringTransactionId: z.string().uuid(),
  description: z.string(),
  amount: z.number(),
});

export const ExpensesUpdateSchema = ExpensesSchema.pick({
  recurringTransactionId: true,
  description: true,
  amount: true
});
export const ExpensesCreateSchema = ExpensesSchema.pick({
  recurringTransactionId: true,
  description: true,
  amount: true
});

export type ExpensesUpdateType = z.infer<typeof ExpensesUpdateSchema>;
export type ExpensesCreateType = z.infer<typeof ExpensesCreateSchema>;
