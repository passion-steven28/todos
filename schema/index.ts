import * as z from "zod";

export const TaskInputSchema = z.object({
    category: z.string(),
    title: z.string(),
    userId: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
})