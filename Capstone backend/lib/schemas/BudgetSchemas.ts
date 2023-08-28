import { z } from "zod"

const BudgetSchema = z.object({
    id: z.string().uuid(),
    groupId: z.string().uuid(), //get current user for owner id

})

export const BudgetUpdateSchema = BudgetSchema.pick({
    groupId: true, 

})

export const BudgetCreateSchema = BudgetSchema.pick({
    groupId: true, 

})

export type BudgetUpdateType = z.infer<typeof BudgetUpdateSchema>
export type BudgetCreateType = z.infer<typeof BudgetCreateSchema>

//export type BudgetCreateType = z.infer<typeof BudgetSchema>

/**
 *     recurringTransactions: z.any(),
    oneTimeTransaction: z.any()
 * 
 *     recurringTransactions: true,
    oneTimeTransaction: true
 */