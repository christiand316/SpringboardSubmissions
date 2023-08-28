import { z } from "zod";

const DebtSchema = z.object({
  id: z.string().uuid(),
  recurringTransactionId: z.string().uuid(),
  description: z.string(),
  rate: z.number(),

  startTerm: z.string(),
  totalTerm: z.number(),
  totalAmount: z.number(),

});


export const DebtCreateSchema = DebtSchema.pick({
    recurringTransactionId: true,
    description: true,
    rate: true,
    startTerm: true,
    totalTerm: true,
    totalAmount: true
  });
export const DebtUpdateSchema = DebtSchema.pick({
    recurringTransactionId: true,
    description: true,
    rate: true,
    startTerm: true,
    totalTerm: true,
    totalAmount: true
});


export type DebtUpdateType = z.infer<typeof DebtUpdateSchema>;
export type DebtCreateType = z.infer<typeof DebtCreateSchema>;
